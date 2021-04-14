import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function MainLayout(props) {
    return <React.Fragment>
        <div className={'container-fluid'}>
            <Header/>
            {props.children}
            <Footer />
        </div>
    </React.Fragment>
}
export default MainLayout;