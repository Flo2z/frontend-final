const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, category, amount, description, date } = req.body;

  // Convert amount to number if it's a string
  const parsedAmount = Number(amount);

  const income = new IncomeSchema({
    title,
    amount: parsedAmount,
    description,
    date,
    category,
    user: req.user._id,
  });

  try {
    if (!title || !description || !date || !category) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await IncomeSchema.findOneAndDelete({ _id: id, user: req.user._id });
    if (!income) {
      return res.status(404).json({ message: "Income not found or not authorized" });
    }
    res.status(200).json({ message: "Income Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};