const CategorySchema = require("../models/CategoryModel");
const ExpenseSchema = require("../models/ExpenseModel");
const IncomeSchema = require("../models/IncomeModel");
const asyncHandler = require("express-async-handler");

// Add a new category
exports.addCategory = asyncHandler(async (req, res) => {
    const { name, type, monthlyBudget } = req.body;

    // Validate input
    if (!name || !type) {
        res.status(400);
        throw new Error("Name and type are required");
    }
    if (monthlyBudget < 0) {
        res.status(400);
        throw new Error("Monthly budget must be a non-negative number");
    }

    // Create category
    const category = await CategorySchema.create({
        name,
        type,
        monthlyBudget: monthlyBudget || 0,
        user: req.user._id,
    });

    res.status(201).json({
        _id: category._id,
        name: category.name,
        type: category.type,
        monthlyBudget: category.monthlyBudget,
    });
});

// Get all categories for the user
exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await CategorySchema.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(categories);
});

// Update a category
exports.updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, type, monthlyBudget } = req.body;

    // Validate input
    if (!name || !type) {
        res.status(400);
        throw new Error("Name and type are required");
    }
    if (monthlyBudget < 0) {
        res.status(400);
        throw new Error("Monthly budget must be a non-negative number");
    }

    // Find the existing category
    const category = await CategorySchema.findById(id);
    if (!category || category.user.toString() !== req.user._id.toString()) {
        res.status(404);
        throw new Error("Category not found or not authorized");
    }

    // Check if the new name is unique (excluding the current category)
    const existingCategory = await CategorySchema.findOne({
        name,
        user: req.user._id,
        _id: { $ne: id },
    });
    if (existingCategory) {
        res.status(400);
        throw new Error("Category name already exists");
    }

    // Store the old category name
    const oldName = category.name;

    // Update category
    const updatedCategory = await CategorySchema.findByIdAndUpdate(
        id,
        {
            name,
            type,
            monthlyBudget: monthlyBudget || 0,
        },
        { new: true }
    );

    // Update category name in incomes
    await IncomeSchema.updateMany(
        { category: oldName, user: req.user._id },
        { $set: { category: name } }
    );

    // Update category name in expenses
    await ExpenseSchema.updateMany(
        { category: oldName, user: req.user._id },
        { $set: { category: name } }
    );

    res.status(200).json({
        _id: updatedCategory._id,
        name: updatedCategory.name,
        type: updatedCategory.type,
        monthlyBudget: updatedCategory.monthlyBudget,
    });
});

// Delete a category
exports.deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if category has associated transactions
    const hasExpenses = await ExpenseSchema.findOne({ category: (await CategorySchema.findById(id)).name, user: req.user._id });
    const hasIncomes = await IncomeSchema.findOne({ category: (await CategorySchema.findById(id)).name, user: req.user._id });

    if (hasExpenses || hasIncomes) {
        res.status(400);
        throw new Error("Cannot delete category with associated transactions");
    }

    // Delete category
    const category = await CategorySchema.findOneAndDelete({ _id: id, user: req.user._id });

    if (!category) {
        res.status(404);
        throw new Error("Category not found or not authorized");
    }

    res.status(200).json({ message: "Category deleted" });
});

// Get category data for a specific month
exports.getCategoryDataByMonth = asyncHandler(async (req, res) => {
    const { month, year } = req.query;

    // Validate input
    if (!month || !year || month < 1 || month > 12) {
        res.status(400);
        throw new Error("Valid month (1-12) and year are required");
    }

    // Define date range for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    // Get all categories for the user
    const categories = await CategorySchema.find({ user: req.user._id });

    // Fetch expenses or incomes for each category within the date range
    const categoryData = await Promise.all(
        categories.map(async (category) => {
            let transactions = [];
            let totalAmount = 0;

            if (category.type === "expense") {
                transactions = await ExpenseSchema.find({
                    category: category.name,
                    date: { $gte: startDate, $lt: endDate },
                    user: req.user._id,
                });
                totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
            } else {
                transactions = await IncomeSchema.find({
                    category: category.name,
                    date: { $gte: startDate, $lt: endDate },
                    user: req.user._id,
                });
                totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
            }

            return {
                _id: category._id,
                name: category.name,
                type: category.type,
                monthlyBudget: category.monthlyBudget,
                totalAmount,
                transactions,
            };
        })
    );

    res.status(200).json(categoryData);
});