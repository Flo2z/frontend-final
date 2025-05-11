import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled from "styled-components";
import MainLayout from "./styles/MainLayout";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useGlobalContext } from "./context/globalContext";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
    const { isAuthenticated } = useGlobalContext();

    return (
        <BrowserRouter>
            <AppStyled>
                <Routes>
                    <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
                    <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
                    <Route path="/" element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}>
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </AppStyled>
        </BrowserRouter>
    );
}

const AppStyled = styled.div`
    height: 100vh;
    background linear-gradient(to right bottom, rgb(230, 230, 250), rgb(240, 240, 240));
    position: relative;


    
    main {
        flex: 1;
        border: 3px solid #ffffff;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        overflow-x: hidden;

        &::-webkit-scrollbar {
            width: 0;
        }
    }
`;

export default App;