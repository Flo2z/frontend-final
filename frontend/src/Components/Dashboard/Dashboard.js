import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { plus } from "../../utils/Icons";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
    categories,
    getCategories,
    setActive,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
    getCategories();
  }, []);

  // Separate income and expense categories
  const incomeCategories = categories.filter((cat) => cat.type === "income");
  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  // Calculate summaries for income categories
  const incomeSummaries = incomeCategories.map((category) => {
    const transactions = incomes.filter((inc) => inc.category === category.name);
    const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    return {
      ...category,
      transactions,
      totalAmount,
      transactionCount: transactions.length,
    };
  });

  // Calculate summaries for expense categories
  const expenseSummaries = expenseCategories.map((category) => {
    const transactions = expenses.filter((exp) => exp.category === category.name);
    const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    return {
      ...category,
      transactions,
      totalAmount,
      transactionCount: transactions.length,
    };
  });

  // Pie chart options
  const pieChartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: Rs. ${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
      <DashboardStyled>
        <InnerLayout>
          <div className="dashboard-grid">
            <div className="left-section">
              <div className="category-summary">
                <div className="category-header">
                  <h2>Income Categories</h2>
                  <button
                      className="add-btn"
                      onClick={() => setActive(2)} // Switch to Income component
                      title="Add Income"
                  >
                    {plus}
                  </button>
                </div>
                {incomeSummaries.length === 0 && <p>No income categories found.</p>}
                <div className="category-list">
                  {incomeSummaries.map((cat) => {
                    const earned = cat.totalAmount;
                    const remaining = Math.max(0, cat.monthlyBudget - earned);
                    const pieData = {
                      labels: ["Earned", "Remaining"],
                      datasets: [
                        {
                          data: [earned, remaining],
                          backgroundColor: ["#42AD00", "#FFA500"],
                          borderColor: "#ffffff",
                          borderWidth: 2,
                        },
                      ],
                    };
                    return (
                        <div key={cat._id} className="category-item">
                          <h3>{cat.name}</h3>
                          <p>Total Earned: Rs. {cat.totalAmount.toFixed(2)}</p>
                          <p>Monthly Budget: Rs. {cat.monthlyBudget.toFixed(2)}</p>
                          <p>Transactions: {cat.transactionCount}</p>
                          <div className="pie-chart">
                            <Pie data={pieData} options={pieChartOptions} />
                          </div>
                        </div>
                    );
                  })}
                </div>
                <div className="category-header">
                  <h2>Expense Categories</h2>
                  <button
                      className="add-btn"
                      onClick={() => setActive(3)} // Switch to Expenses component
                      title="Add Expense"
                  >
                    {plus}
                  </button>
                </div>
                {expenseSummaries.length === 0 && <p>No expense categories found.</p>}
                <div className="category-list">
                  {expenseSummaries.map((cat) => {
                    const spent = cat.totalAmount;
                    const remaining = Math.max(0, cat.monthlyBudget - spent);
                    const pieData = {
                      labels: ["Spent", "Remaining"],
                      datasets: [
                        {
                          data: [spent, remaining],
                          backgroundColor: ["#FF0000", "#42AD00"],
                          borderColor: "#ffffff",
                          borderWidth: 2,
                        },
                      ],
                    };
                    return (
                        <div key={cat._id} className="category-item">
                          <h3>{cat.name}</h3>
                          <p>Total Spent: Rs. {cat.totalAmount.toFixed(2)}</p>
                          <p>Monthly Budget: Rs. {cat.monthlyBudget.toFixed(2)}</p>
                          <p>Transactions: {cat.transactionCount}</p>
                          <div className="pie-chart">
                            <Pie data={pieData} options={pieChartOptions} />
                          </div>
                        </div>
                    );
                  })}
                </div>
              </div>
              <div className="stats-all-time">
                <h2>Statistics All Time</h2>
                <div className="stats-con">
                  <div className="income">
                    <h3>All-Time Income</h3>
                    <p>Rs. {totalIncome()}</p>
                  </div>
                  <div className="expense">
                    <h3>All-Time Expense</h3>
                    <p>Rs. {totalExpenses()}</p>
                  </div>
                  <div className="balance">
                    <h3>All-Time Balance</h3>
                    <p>Rs. {totalBalance()}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-section">
              <div className="history-con">
                <History />
              </div>
            </div>
          </div>
        </InnerLayout>
      </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .history-item{
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.3);
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 2rem;
    min-height: 100%;
  }
  .left-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .right-section {
    .history-con {
      background: rgba(255, 255, 255, 0.8);
      border: 2px solid #ffffff;
      border-radius: 15px;
      padding: 1rem;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
      max-height: 100vh;
      overflow-y: auto;
      h2 {
        color:rgb(34, 34, 96);
        margin-bottom: 1rem;
      }
    }
  }
  .category-summary {
    .category-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      h2 {
        color: rgb(34, 34, 96);
      }
      .add-btn {
        background: var(--color-accent);
        border: none;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #ffffff;
        font-size: 1.2rem;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        &:hover {
          background: var(--color-green);
        }
      }
    }
    .category-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .category-item {
      margin-bottom:1.3rem;
      background: rgba(255, 255, 255, 0.8);
      border: 2px solid #ffffff;
      border-radius: 15px;
      padding: 1rem;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      h3 {
        font-size: 1.3rem;
        color: rgb(34, 34, 96);
        margin-bottom: 0.5rem;
        text-align: center;
      }
      p {
        font-size: 1rem;
        color: var(--primary-color2);
        margin: 0.3rem 0;
        text-align: center;
      }
      .pie-chart {
        max-width: 150px;
        max-height: 150px;
        margin-top: 1rem;
      }
    }
  }
  .stats-all-time {
    h2 {
      color: rgb(34, 34, 96);
      margin-bottom: 1rem;
    }
    .stats-con {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      .income,
      .expense {
        grid-column: span 2;
      }
      .income,
      .expense,
      .balance {
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
        border-radius: 20px;
        padding: 1rem;
        h3 {
          color: rgb(34, 34, 96);
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: 1.8rem;
          font-weight: 700;
          color: rgb(34, 34, 96);
        }
      }
      .balance {
        grid-column: 2 / 4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          color: rgb(34, 34, 96);
          font-size: 1.8rem;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
      .right-section {
        grid-row: 2;
      }
    }
  }
`;
export default Dashboard;