import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import { signout } from "../../utils/Icons";
import { menuItems } from "../../utils/menuItems";
import {useGlobalContext} from "../../context/globalContext";

function Navigation({ active, setActive }) {
    const { user, logout } = useGlobalContext();
    return (
        <NavStyled>
            <div className="user-con">
                <div className="text">
                    <h2>{user?.name || "Guest"}</h2>
                    <p>Expense Tracker!</p>
                </div>
            </div>

            <ul className="menu-items">
                {menuItems.map(item => (
                    <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? "active" : ""}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>

            <div className="bottom-nav">
                <li onClick={logout}>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    position: sticky;
    top: 0;
    width: 100%;
    height: 80px;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(252, 246, 249, 0.5);
    border-bottom: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .user-con {
        display: flex;
        align-items: center;
        gap: 1rem;

        .text h2 {
            margin: 0;
            font-size: 1.2rem;
            color: rgba(34, 34, 96, 1);
        }
        .text p {
            margin: 0;
            font-size: 0.9rem;
            color: rgba(34, 34, 96, 0.6);
        }
    }

    .menu-items {
        display: flex;
        align-items: center;
        gap: 2rem;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            transition: background 0.2s;

            &:hover {
                background: rgba(255, 255, 255, 0.3);
            }

            i, span {
                color: rgba(34, 34, 96, 0.6);
                font-weight: 500;
            }
        }
    }

    .active {
        background: rgba(255, 255, 255, 0.6);
        i, span {
            color: rgba(34, 34, 96, 1) !important;
        }
    }

    .bottom-nav li {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        i, span {
            color: rgba(34, 34, 96, 0.6);
        }
        &:hover {
            color: rgba(34, 34, 96, 1);
        }
    }
`;

export default Navigation;