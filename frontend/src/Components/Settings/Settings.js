import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Button from "../Button/Button";
import { plus, trash, settings } from "../../utils/Icons";

function Settings() {
    const { categories, addCategory, deleteCategory, getCategories, updateCategory, error, setError } = useGlobalContext();

    const [formState, setFormState] = useState({
        name: "",
        type: "expense",
        monthlyBudget: "",
    });
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        getCategories();
    }, []);

    // Populate form when editing a category
    useEffect(() => {
        if (editingCategory) {
            setFormState({
                name: editingCategory.name,
                type: editingCategory.type,
                monthlyBudget: editingCategory.monthlyBudget.toString(),
            });
        } else {
            setFormState({ name: "", type: "expense", monthlyBudget: "" });
        }
    }, [editingCategory]);

    const handleInput = (name) => (e) => {
        setFormState({ ...formState, [name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, type, monthlyBudget } = formState;

        if (!name || !type) {
            setError("Name and type are required");
            return;
        }
        if (monthlyBudget && Number(monthlyBudget) < 0) {
            setError("Monthly budget must be a non-negative number");
            return;
        }

        const categoryData = {
            name,
            type,
            monthlyBudget: monthlyBudget ? Number(monthlyBudget) : 0,
        };

        if (editingCategory) {
            updateCategory(editingCategory._id, categoryData);
            setEditingCategory(null);
        } else {
            addCategory(categoryData);
        }
        setFormState({ name: "", type: "expense", monthlyBudget: "" });
    };

    return (
        <SettingsStyled>
            <InnerLayout>
                <h1>Settings</h1>
                <h2>Manage Categories</h2>
                <div className="category-form">
                    <form onSubmit={handleSubmit}>
                        {error && <p className="error">{error}</p>}
                        <div className="input-control">
                            <input
                                type="text"
                                value={formState.name}
                                name="name"
                                placeholder="Category Name"
                                onChange={handleInput("name")}
                            />
                        </div>
                        <div className="input-control">
                            <select
                                value={formState.type}
                                name="type"
                                onChange={handleInput("type")}
                                disabled={!!editingCategory} // Disable during editing
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                        <div className="input-control">
                            <input
                                type="number"
                                value={formState.monthlyBudget}
                                name="monthlyBudget"
                                placeholder="Monthly Budget"
                                onChange={handleInput("monthlyBudget")}
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div className="submit-btn">
                            <Button
                                name={editingCategory ? "Update Category" : "Add Category"}
                                icon={plus}
                                bPad={".8rem 1rem"}
                                bRad={"10px"}
                                bg={"var(--color-accent)"}
                                color={"#fff"}
                            />
                            {editingCategory && (
                                <Button
                                    name={"Cancel"}
                                    bPad={".8rem 1rem"}
                                    bRad={"10px"}
                                    bg={"var(--color-delete)"}
                                    color={"#fff"}
                                    onClick={() => {
                                        setEditingCategory(null);
                                        setFormState({ name: "", type: "expense", monthlyBudget: "" });
                                    }}
                                />
                            )}
                        </div>
                    </form>
                </div>
                <div className="category-list">
                    <h3>Existing Categories</h3>
                    {categories.length === 0 && <p>No categories found.</p>}
                    {categories.map((category) => (
                        <div key={category._id} className="category-item">
                            <div className="category-details">
                                <h4>{category.name}</h4>
                                <p>Type: {category.type}</p>
                                <p>Monthly Budget: {category.monthlyBudget.toFixed(2)}₸</p>
                            </div>
                            <div className="category-actions">
                                <Button
                                    icon={settings}
                                    bPad={".5rem"}
                                    bRad={"50%"}
                                    bg={"var(--color-accent)"}
                                    color={"#fff"}
                                    iColor={"#fff"}
                                    onClick={() => setEditingCategory(category)}
                                />
                                <Button
                                    icon={trash}
                                    bPad={".5rem"}
                                    bRad={"50%"}
                                    bg={"var(--color-delete)"}
                                    color={"#fff"}
                                    iColor={"#fff"}
                                    onClick={() => deleteCategory(category._id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </InnerLayout>
        </SettingsStyled>
    );
}

const SettingsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    h1, h2, h3 {
        color: #222260;
    }
    .category-form {
        margin-top: 1.2rem;
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid #ffffff;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
        form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        input, select {
            font-family: inherit;
            font-size: inherit;
            outline: none;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            border: 2px solid #fff;
            background: transparent;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.3);
            color: #222260;
            &::placeholder {
                color: rgba(34, 34, 96, 0.4);
            }
        }
        select {
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active {
                color: #222260;
            }
            &:disabled {
                background: rgba(200, 200, 200, 0.3);
                cursor: not-allowed;
                color: rgba(34, 34, 96, 0.6);
            }
        }
        .input-control {
            input, select {
                width: 100%;
            }
        }
        .submit-btn {
            display: flex;
            gap: 1rem;
            button {
                &:hover {
                    background: var(--color-green) !important;
                }
            }
        }
    }
    .category-list {
        margin-top: 2rem;
        h3 {
            margin-bottom: 1rem;
        }
        .category-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(255, 255, 255, 0.8);
            border: 2px solid #ffffff;
            border-radius: 10px;
            padding: 1rem;
            margin-bottom: 1rem;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
            .category-details {
                h4 {
                    margin: 0;
                    font-size: 1.3rem;
                    color: var(--primary-color);
                }
                p {
                    margin: 0.5rem 0;
                    color: var(--primary-color2);
                }
            }
            .category-actions {
                display: flex;
                gap: 0.5rem;
                button {
                    &:hover {
                        background: var(--color-green) !important;
                    }
                }
            }
        }
    }
`;

export default Settings;