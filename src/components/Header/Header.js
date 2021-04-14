import React from "react";
import TopHeaderRedBlock from "./TopHeaderRedBlock";
import SocialLinksHeaderLine from "./SocialLinksHeaderLine";
import NavBarBlock from "./NavBarBlock";

function Header() {
    return <React.Fragment>
        <TopHeaderRedBlock />
        <SocialLinksHeaderLine />
        <NavBarBlock />
    </React.Fragment>
}
export default Header;