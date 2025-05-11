import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [active, setActive] = useState(1);

    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (token) {
            setAuthToken(token);
            setIsAuthenticated(true);
            if (storedUser){
                setUser(JSON.parse(storedUser));
            }
            getCategories();
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/login`, { email, password });
            const { _id, name, email: userEmail, token } = response.data;
            localStorage.setItem("token", token);
            setAuthToken(token);
            localStorage.setItem("user", JSON.stringify({ _id, name, email }));
            setUser({ _id, name, email: userEmail });
            setIsAuthenticated(true);
            getCategories();
        } catch (err) {
            setError(err.response?.data?.message || "Ошибка входа");
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/register`, userData);
            const { _id, name, email, token } = response.data;
            localStorage.setItem("token", token);
            setAuthToken(token);
            localStorage.setItem("user", JSON.stringify({ _id, name, email }));
            setUser({ _id, name, email });
            setIsAuthenticated(true);
            getCategories();
        } catch (err) {
            setError(err.response?.data?.message || "Ошибка регистрации");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        setAuthToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setIncomes([]);
        setExpenses([]);
        setCategories([]);
        setError(null);
        setActive(1);
    };

    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось добавить доход");
        }
    };

    const updateIncome = async (id, income) => {
        try {
            await axios.put(`${BASE_URL}update-income/${id}`, income);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось обновить доход");
        }
    };

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось загрузить доходы");
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось удалить доход");
        }
    };

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось добавить расход");
        }
    };

    const updateExpense = async (id, expense) => {
        try {
            await axios.put(`${BASE_URL}update-expense/${id}`, expense);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось обновить расход");
        }
    };

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось загрузить расходы");
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось удалить расход");
        }
    };

    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 7);
    };

    const addCategory = async (category) => {
        try {
            await axios.post(`${BASE_URL}add-category`, category);
            getCategories();
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось добавить категорию");
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-categories`);
            setCategories(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось загрузить категории");
        }
    };

    const updateCategory = async (id, updatedCategory) => {
        try {
            await axios.put(`${BASE_URL}update-category/${id}`, updatedCategory);
            // Обновляем категории, доходы и расходы
            await Promise.all([getCategories(), getIncomes(), getExpenses()]);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось обновить категорию");
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-category/${id}`);
            getCategories();
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось удалить категорию");
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                updateIncome,
                getIncomes,
                incomes,
                deleteIncome,
                expenses,
                totalIncome,
                addExpense,
                updateExpense,
                getExpenses,
                deleteExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                error,
                setError,
                user,
                isAuthenticated,
                login,
                register,
                logout,
                categories,
                addCategory,
                getCategories,
                updateCategory,
                deleteCategory,
                active,
                setActive,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};