import React from "react";
import {Navbar,Nav,NavDropdown, ButtonGroup,Button} from 'react-bootstrap';

function NavBarBlock() {
    return <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand href="#home"><img src={require('./../../assets/images/917bd5698f9b74b38081440b9eff12dc.png').default} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className={'justify-content-end'}>

            <Nav>
                <Nav.Link href="#deets">Home</Nav.Link>
                <NavDropdown title="Classes" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Services" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Shop" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Social" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Franchise" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                </Nav.Link>
            </Nav>


        </Navbar.Collapse>
        <div className={'nav-right-block'}>
            <div className={'search-block'}>
                <a href={''}>
                    <i className="fas fa-search"></i>
                </a>
            </div>
            <ButtonGroup aria-label="Basic example">
                <Button className={'btn-pink-bordered'}>Log In</Button>

                <Button className={'btn-pink'}>Register</Button>
            </ButtonGroup>
            <div className={'cart-block'}>
                <a href={''}><i className="fas fa-shopping-bag"></i></a>
            </div>

        </div>
    </Navbar>
}
export default NavBarBlock;