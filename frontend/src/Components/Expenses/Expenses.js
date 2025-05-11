import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import ExpenseForm from "./ExpenseForm";
import IncomeItem from "../IncomeItem/IncomeItem";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Expenses() {
  const { expenses, getExpenses, deleteExpense, totalExpenses, categories, updateExpense } = useGlobalContext();
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    getExpenses();
  }, []);

  const groupedExpenses = expenses.reduce((acc, expense) => {
    const { category } = expense;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(expense);
    return acc;
  }, {});

  const categoryBudgets = categories.reduce((acc, cat) => {
    acc[cat.name] = cat.monthlyBudget;
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedExpenses).sort();

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
            return `${label}: ${value.toFixed(2)}₸`;
          },
        },
      },
    },
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const clearEdit = () => {
    setEditingExpense(null);
  };

  return (
      <ExpenseStyled>
        <InnerLayout>
          <h1>Expenses</h1>
          <h2 className="total-expense">
            Total Expense: <span>{totalExpenses()}₸</span>
          </h2>
          <div className="expense-content">
            <div className="form-container">
              <ExpenseForm editingExpense={editingExpense} clearEdit={clearEdit} />
            </div>
            <div className="expenses">
              {sortedCategories.length === 0 && <p>No expenses found.</p>}
              {sortedCategories.map((category) => {
                const totalAmount = groupedExpenses[category].reduce((sum, expense) => sum + expense.amount, 0);
                const monthlyBudget = categoryBudgets[category] || 0;
                const remaining = Math.max(0, monthlyBudget - totalAmount);
                const pieData = {
                  labels: ["Spent", "Remaining"],
                  datasets: [
                    {
                      data: [totalAmount, remaining],
                      backgroundColor: ["#FF0000", "#42AD00"],
                      borderColor: "#ffffff",
                      borderWidth: 2,
                    },
                  ],
                };
                return (
                    <div key={category} className="category-group">
                      <div className="category-header">
                        <h3>{category}</h3>
                        <p>Monthly Budget: {monthlyBudget.toFixed(2)}₸</p>
                        <p>Total Spent: {totalAmount.toFixed(2)}₸</p>
                        <div className="pie-chart">
                          <Pie data={pieData} options={pieChartOptions} />
                        </div>
                      </div>
                      {groupedExpenses[category].map((expense) => (
                          <IncomeItem
                              key={expense._id}
                              id={expense._id}
                              title={expense.title}
                              description={expense.description}
                              amount={expense.amount}
                              date={expense.date}
                              type={expense.type}
                              category={expense.category}
                              indicatorColor="var(--color-delete)"
                              deleteItem={deleteExpense}
                              onEdit={() => handleEdit(expense)}
                          />
                      ))}
                    </div>
                );
              })}
            </div>
          </div>
        </InnerLayout>
      </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  input, select, textarea{
    width: 100%;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
  }
  h1, h5{
    color: #222260;
  }
  .total-expense {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ffffff;
    color: #222260;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-delete);
    }
  }
  .expense-content {
    display: flex;
    gap: 2rem;
    .expenses {
      flex: 1;
    }
  }
  .category-group {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 2px solid #ffffff;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
    .category-header {
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--color-grey);
      padding-bottom: 0.5rem;
      h3 {
        font-size: 1.5rem;
        color: #222260;
      }
      p {
        font-size: 1rem;
        color: var(--primary-color2);
        margin: 0.3rem 0;
      }
      .pie-chart {
        max-width: 150px;
        max-height: 150px;
        margin: 1rem auto;
      }
    }
  }
`;
export default Expenses;