import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "./IncomeForm";
import IncomeItem from "../IncomeItem/IncomeItem";

function Income() {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } =
      useGlobalContext();

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

  // Sort categories alphabetically for consistent display
  const sortedCategories = Object.keys(groupedIncomes).sort();

  return (
      <IncomeStyled>
        <InnerLayout>
          <h1>Incomes</h1>
          <h2 className="total-income">
            Total Income: <span>Rs. {totalIncome()}</span>
          </h2>
          <div className="income-content">
            <div className="form-container">
              <Form />
            </div>
            <div className="incomes">
              {sortedCategories.map((category) => (
                  <div key={category} className="category-group">
                    <h3>{category}</h3>
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
              ))}
            </div>
          </div>
        </InnerLayout>
      </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
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
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }
  }
`;

export default Income;