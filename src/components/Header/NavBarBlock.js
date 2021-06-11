import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, ButtonGroup, Button } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import { logout } from "./../../redux/actions/userActions";
import { getRemoteCart } from "./../../redux/actions/cartActions";
import { connect } from "react-redux";
import { makeUrl } from "../../redux/actions/functions";

const cookies = new Cookies();

function NavBarBlock(props) {
  let token = cookies.get("token");
  let [cart, setCart] = useState([]);

  useEffect(() => {
    if (!!token) {
      props.getRemoteCart().then((response) => {
        setCart(response.data.items);
      });
    }
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="#home">
        <NavLink
          to={makeUrl(
            !!props.match.params.invite === true ? "/home" : "/",
            props.match.params.invite
          )}
        >
          <img
            src={
              require("./../../assets/images/917bd5698f9b74b38081440b9eff12dc.png")
                .default
            }
          />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className={"justify-content-end"}
      >
        <Nav>
          <Nav.Link href="#deets">Home</Nav.Link>
          <NavDropdown title="Classes" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Services" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Shop" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Social" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Franchise" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link eventKey={2} href="#memes">
            Dank memes
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <div className={"nav-right-block"}>
        <div className={"search-block"}>
          <a href={""}>
            <i className="fas fa-search"></i>
          </a>
        </div>

        <ButtonGroup aria-label="Basic example">
          {!token ? (
            <React.Fragment>
              <Button
                className={"btn-pink-bordered"}
                onClick={() => {
                  window.location.href = makeUrl(
                    "/login",
                    props.match.params.invite
                  );
                }}
              >
                Log In
              </Button>

              <Button
                className={"btn-pink"}
                onClick={() => {
                  window.location.href = makeUrl(
                    "/register",
                    props.match.params.invite
                  );
                }}
              >
                Register
              </Button>
            </React.Fragment>
          ) : (
            <Button
              className={"btn-pink-bordered"}
              onClick={() => {
                props
                  .logout()
                  .then((response) => {
                    cookies.remove("token");
                    window.location.href = makeUrl(
                      !!props.match.params.invite === true ? "/home" : "/",
                      props.match.params.invite
                    );
                  })
                  .catch((error) => {
                    cookies.remove("token");
                    window.location.href = makeUrl(
                      !!props.match.params.invite === true ? "/home" : "/",
                      props.match.params.invite
                    );
                  });
              }}
            >
              Logout
            </Button>
          )}
        </ButtonGroup>
        <div className={"cart-block"}>
          <NavLink to={makeUrl("/cart", props.match.params.invite)}>
            <i className="fas fa-shopping-bag"></i>
          </NavLink>
          {cart.length > 0 ? <span className={"counter"}></span> : null}
        </div>
      </div>
    </Navbar>
  );
}
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      return dispatch(logout());
    },
    getRemoteCart: () => {
      return dispatch(getRemoteCart());
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavBarBlock));
