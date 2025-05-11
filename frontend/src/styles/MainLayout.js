import React from "react";
import Navigation from "../Components/Navigation/Navigation";
import { MainLayout as MainLayoutStyled } from "../styles/Layouts";
import Dashboard from "../Components/Dashboard/Dashboard";
import Income from "../Components/Income/Income";
import Expenses from "../Components/Expenses/Expenses";
import Settings from "../Components/Settings/Settings";
import { useGlobalContext } from "../context/globalContext";

function MainLayout() {
    const { active, setActive } = useGlobalContext();

    let Content;
    if (active === 1) Content = <Dashboard />;
    if (active === 2) Content = <Income />;
    if (active === 3) Content = <Expenses />;
    if (active === 4) Content = <Settings />;

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Navigation active={active} setActive={setActive} />
            <main style={{ flex: 1, overflowY: "auto" }}>
                {Content}
            </main>
        </div>
    );
}

export default MainLayout;