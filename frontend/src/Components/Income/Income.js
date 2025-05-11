import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import IncomeForm from "./IncomeForm";
import IncomeItem from "../IncomeItem/IncomeItem";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Income() {
  const { incomes, getIncomes, deleteIncome, totalIncome, categories } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);

  // Group incomes by category
  const groupedIncomes = incomes.reduce((acc, income) => {
    const { category } = income;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(income);
    return acc;
  }, {});

  // Get monthly budget for each category
  const categoryBudgets = categories.reduce((acc, cat) => {
    acc[cat.name] = cat.monthlyBudget;
    return acc;
  }, {});

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedIncomes).sort();

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
            return `${label}: ${value.toFixed(2)}₸`;
          },
        },
      },
    },
  };

  return (
      <IncomeStyled>
        <InnerLayout>
          <h1>Incomes</h1>
          <h2 className="total-income">
            Total Income: <span>{totalIncome()}₸</span>
          </h2>
          <div className="income-content">
            <div className="form-container">
              <IncomeForm />
            </div>
            <div className="incomes">
              {sortedCategories.length === 0 && <p>No incomes found.</p>}
              {sortedCategories.map((category) => {
                const totalAmount = groupedIncomes[category].reduce((sum, income) => sum + income.amount, 0);
                const monthlyBudget = categoryBudgets[category] || 0;
                const remaining = Math.max(0, monthlyBudget - totalAmount);
                const pieData = {
                  labels: ["Earned", "Remaining"],
                  datasets: [
                    {
                      data: [totalAmount, remaining],
                      backgroundColor: ["#42AD00", "#FFA500"],
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
                        <p>Total Earned: {totalAmount.toFixed(2)}₸</p>
                        <div className="pie-chart">
                          <Pie data={pieData} options={pieChartOptions} />
                        </div>
                      </div>
                      {groupedIncomes[category].map((income) => {
                        const { _id, title, amount, date, category, description, type } = income;
                        return (
                            <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                        );
                      })}
                    </div>
                );
              })}
            </div>
          </div>
        </InnerLayout>
      </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  h1, h5 {
  color:rgb(34, 34, 96);
  }

  input, select, textarea{
    width: 100%;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
  }
  display: flex;
  overflow: auto;
  .total-income {
    color: rgb(34, 34, 96);
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
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
        color: rgb(34, 34, 96);
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
export default Income;