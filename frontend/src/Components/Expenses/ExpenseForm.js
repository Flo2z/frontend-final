import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function ExpenseForm({ editingExpense, clearEdit }) {
    const { addExpense, updateExpense, categories, error, setError } = useGlobalContext();

    const [inputState, setInputState] = useState({
        title: "",
        amount: "",
        date: null,
        category: "",
        description: "",
    });

    useEffect(() => {
        if (editingExpense) {
            setInputState({
                title: editingExpense.title,
                amount: editingExpense.amount.toString(),
                date: editingExpense.date ? new Date(editingExpense.date) : null,
                category: editingExpense.category,
                description: editingExpense.description,
            });
        } else {
            setInputState({
                title: "",
                amount: "",
                date: null,
                category: "",
                description: "",
            });
        }
    }, [editingExpense]);

    const { title, amount, date, category, description } = inputState;

    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError("");
    };

    const handleDate = (date) => {
        setInputState({ ...inputState, date });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount || !date || !category) {
            setError("Please fill in all required fields");
            return;
        }
        const expenseData = {
            title,
            amount: parseFloat(amount),
            date: date.toISOString(),
            category,
            description,
        };
        if (editingExpense) {
            updateExpense(editingExpense._id, expenseData);
            clearEdit();
        } else {
            addExpense(expenseData);
        }
        setInputState({
            title: "",
            amount: "",
            date: null,
            category: "",
            description: "",
        });
    };

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name="title"
                    placeholder="Expense Title"
                    onChange={handleInput("title")}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="number"
                    name="amount"
                    placeholder="Expense Amount"
                    onChange={handleInput("amount")}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id="date"
                    placeholderText="Select Date"
                    selected={date}
                    dateFormat="yyyy-MM-dd"
                    onChange={handleDate}
                />
            </div>
            <div className="selects input-control">
                <select
                    required
                    value={category}
                    name="category"
                    id="category"
                    onChange={handleInput("category")}
                >
                    <option value="" disabled>
                        Select Category
                    </option>
                    {categories
                        .filter((cat) => cat.type === "expense")
                        .map((cat) => (
                            <option key={cat._id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="input-control">
        <textarea
            name="description"
            value={description}
            placeholder="Add A Description"
            id="description"
            cols="30"
            rows="4"
            maxLength="20"
            onChange={handleInput("description")}
        ></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={editingExpense ? "Update Expense" : "Add Expense"}
                    icon={plus}
                    bPad=".8rem 1.6rem"
                    bRad="30px"
                    bg="var(--color-accent)"
                    color="#fff"
                />
            </div>
        </ExpenseFormStyled>
    );
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input,
    textarea,
    select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control {
        input {
            width: 100%;
        }
    }
    .selects {
        select {
            color: rgba(34, 34, 96, 0.4);
            &:focus,
            &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }
    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }
    .error {
        color: var(--color-delete);
        text-align: center;
    }
`;
export default ExpenseForm;