const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, category, amount, description, date } = req.body;

  // Convert amount to number if it's a string
  const parsedAmount = Number(amount);

  const expense = new ExpenseSchema({
    title,
    amount: parsedAmount,
    description,
    date,
    category,
    user: req.user._id,
  });

  try {
    // Validations
    if (!title || !description || !date || !category) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(expense);
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findOneAndDelete({ _id: id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found or not authorized" });
    }
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};