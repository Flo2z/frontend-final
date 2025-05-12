import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { signout } from "../../utils/Icons";
import { menuItems } from "../../utils/menuItems";
import { useGlobalContext } from "../../context/globalContext";

function Navigation({ active, setActive }) {
    const { user, logout } = useGlobalContext();
    const [isExiting, setIsExiting] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLogout = () => {
        setIsExiting(true);
        setTimeout(logout, 500);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <NavStyled
                    as={motion.nav}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <motion.div
                        className="user-con"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <div className="text">
                            <h2>{user?.name || "Guest"}</h2>
                            <p>Expense Tracker!</p>
                        </div>
                    </motion.div>

                    <button
                        className="hamburger"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        ☰
                    </button>

                    <motion.ul
                        className="menu-items"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                    >
                        {menuItems.map((item) => (
                            <motion.li
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className={active === item.id ? "active" : ""}
                                variants={{
                                    hidden: { x: -20, opacity: 0 },
                                    visible: { x: 0, opacity: 1 },
                                }}
                                whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </motion.li>
                        ))}
                    </motion.ul>

                    <div className="bottom-nav">
                        <motion.li
                            onClick={handleLogout}
                            whileHover={{ rotate: 5, color: "rgba(34, 34, 96, 1)" }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            {signout} Sign Out
                        </motion.li>
                    </div>

                    {isMenuOpen && (
                        <motion.div
                            className="mobile-menu"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ul className="mobile-menu-items">
                                {menuItems.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => {
                                            setActive(item.id);
                                            setIsMenuOpen(false);
                                        }}
                                        className={active === item.id ? "active" : ""}
                                    >
                                        {item.icon} {item.title}
                                    </li>
                                ))}
                                <li
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    {signout} Sign Out
                                </li>
                            </ul>
                            <button
                                className="close-menu"
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                ✕
                            </button>
                        </motion.div>
                    )}
                </NavStyled>
            )}
        </AnimatePresence>
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
    z-index: 10;

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

    .hamburger {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: rgba(34, 34, 96, 0.6);
    }

    .menu-items {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin: 0;
        padding: 0;
        list-style: none;

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
        color: rgba(34, 34, 96, 0.6);

        &:hover {
            color: rgba(34, 34, 96, 1);
        }

        i {
            color: rgba(34, 34, 96, 0.6);
        }
    }

    .mobile-menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(252, 246, 249, 0.95);
        z-index: 100;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .mobile-menu-items {
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: center;
    }

    .mobile-menu-items li {
        padding: 1rem;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        &:hover {
            background: rgba(255, 255, 255, 0.3);
        }
    }

    .mobile-menu-items .active {
        font-weight: bold;
        color: rgba(34, 34, 96, 1);
    }

    .close-menu {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: rgba(34, 34, 96, 0.6);
    }

    @media (max-width: 768px) {
        padding: 0 1rem;
        .hamburger {
            display: block;
        }
        .menu-items,
        .bottom-nav {
            display: none;
        }
    }

    @media (min-width: 769px) {
        .hamburger {
            display: none;
        }
        .mobile-menu {
            display: none;
        }
    }
`;

export default Navigation;