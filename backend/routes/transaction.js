const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");
const {registerUser, loginUser} = require("../controllers/AuthController");

const router = require("express").Router();
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post("/add-income", addIncome);
router.get("/get-incomes", getIncomes);
router.delete("/delete-income/:id", deleteIncome);
router.post("/add-expense", addExpense);
router.get("/get-expenses", getExpense);
router.delete("/delete-expense/:id", deleteExpense);
module.exports = router;
