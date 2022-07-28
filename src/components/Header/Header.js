import React from "react";

import HeaderLinks from "./HeaderLinks";
import NavBarBlock from "./NavBarBlock";

function Header() {
    return <React.Fragment>
        <NavBarBlock />
		  <HeaderLinks/>
    </React.Fragment>
}
export default Header;