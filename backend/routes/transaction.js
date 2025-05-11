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
const {
  addCategory,
  getCategories,
  getCategoryDataByMonth,
} = require("../controllers/category");
const { registerUser, loginUser } = require("../controllers/AuthController");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/add-income", protect, addIncome);
router.get("/get-incomes", protect, getIncomes);
router.delete("/delete-income/:id", protect, deleteIncome);
router.post("/add-expense", protect, addExpense);
router.get("/get-expenses", protect, getExpense);
router.delete("/delete-expense/:id", protect, deleteExpense);
router.post("/add-category", protect, addCategory);
router.get("/get-categories", protect, getCategories);
router.get("/get-category-data", protect, getCategoryDataByMonth);
router.put("/update-category/:id", protect, require("../controllers/category").updateCategory);
router.delete("/delete-category/:id", protect, require("../controllers/category").deleteCategory);

module.exports = router;