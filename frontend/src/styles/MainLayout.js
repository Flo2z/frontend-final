import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";
import { MainLayout as MainLayoutStyled } from "../styles/Layouts";
import Dashboard from "../Components/Dashboard/Dashboard";
import Income from "../Components/Income/Income";
import Expenses from "../Components/Expenses/Expenses";

function MainLayout() {
    const [active, setActive] = useState(1);

    let Content;
    if (active === 1) Content = <Dashboard />;
    if (active === 2) Content = <Income />;
    if (active === 3) Content = <Expenses />;

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Top nav */}
            <Navigation active={active} setActive={setActive} />

            <main style={{ flex: 1, overflowY: "auto" }}>
                {Content}
            </main>
        </div>
    );
}


export default MainLayout;