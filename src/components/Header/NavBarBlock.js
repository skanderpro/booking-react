import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, ButtonGroup, Button } from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import "react-bootstrap-submenu/dist/index.css";
import { NavLink, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import { logout } from "./../../redux/actions/userActions";
import { getRemoteCart } from "./../../redux/actions/cartActions";
import { connect } from "react-redux";
import { makeUrl } from "../../redux/actions/functions";
import { NavHashLink } from "react-router-hash-link";

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
					<img src={require("./../../assets/images/Sew-Confident-Primary-Logo-RGB-1024x323.png").default} />
				</NavLink>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse
				id="responsive-navbar-nav"
				className={"justify-content-end"}
			>
				<Nav>
					<Nav.Link href="#deets">Home</Nav.Link>
					<NavDropdownMenu title="Classes" id="collasible-nav-dropdown">

						<DropdownSubmenu href="#action/3.7" title="Classes in Glasgow">
							<NavDropdown.Item href="https://sewconfident.co.uk/glasgow/">All Classes</NavDropdown.Item>
							<NavDropdown.Item href="https://bookeo.com/sewconfidentglasgow/buyvoucher">Glasgow Gift Vouchers</NavDropdown.Item>
						</DropdownSubmenu>
						<DropdownSubmenu href="#action/3.7" title="Classes in Dundee">
							<NavDropdown.Item href="https://sewconfident.co.uk/dundee-classes/">All Classes</NavDropdown.Item>
							<NavDropdown.Item href="https://bookeo.com/sewconfidentdundee/buyvoucher">Dundee Gift Vouchers</NavDropdown.Item>
						</DropdownSubmenu>
						<DropdownSubmenu href="#action/3.7" title="Classes in Chorley">
							<NavDropdown.Item href="https://sewconfident.co.uk/chorley-classes/">All Classes</NavDropdown.Item>
							<NavDropdown.Item href="https://bookeo.com/sewconfidentchorley/buyvoucher">Chorley Gift Vouchers</NavDropdown.Item>
						</DropdownSubmenu>
						<NavDropdown.Item href="https://sewconfident.co.uk/online-classes/">
							Online Classes
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/sewing-retreats/">
							Sewing Retreats
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/parties/">
							Crafty Parties
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/pre-pdge-sewing-classes/">
							Pre-PDGE Sewing Classes
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/vip-membership/">
							VIP Membership
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/teach-for-us/">
							Teach for Us
						</NavDropdown.Item>
					</NavDropdownMenu>
					<Nav.Link href="https://sewconfident.co.uk/product/print-pattern/">Pattern Printing</Nav.Link>
					<NavDropdownMenu title="Services" id="collasible-nav-dropdown">

						<DropdownSubmenu href="#action/3.7" title="Sewing Classes">
							<NavDropdown.Item href="https://sewconfident.co.uk/glasgow/">Classes in Glasgow</NavDropdown.Item>
							<NavDropdown.Item href="https://sewconfident.co.uk/dundee-classes/">Classes in Dundee</NavDropdown.Item>
							<NavDropdown.Item href="https://sewconfident.co.uk/chorley-classes/">Classes in Chorley</NavDropdown.Item>
						</DropdownSubmenu>

						<NavDropdown.Item href="https://sewconfident.co.uk/product/print-pattern/">
							A0 Pattern Printing
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/studios/">
							Our Studios
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/121-2/">
							Private Tuition
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/parties/">
							Crafty Parties
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/sewing-retreats/">
							Sewing Retreats
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/class-vouchers/">
							Class Vouchers
						</NavDropdown.Item>

					</NavDropdownMenu>
					<NavDropdownMenu title="Shop" id="collasible-nav-dropdown">
						<NavDropdown.Item href="https://sewconfident.co.uk/sale">
							Sale
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/sewing-machines/">
							Sewing Machines
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/fabric/">
							Fabric
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/sewing-patterns/">
							Sewing Patterns
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/diy-crafty-kits/">
							DIY Kits
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/haberdashery/">
							Haberdashery
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/sewing-machine-accessories/">
							Sewing Machine Accessories
						</NavDropdown.Item>
						<DropdownSubmenu href="#action/3.7" title="Vouchers">
							<NavDropdown.Item href="https://sewconfident.co.uk/class-vouchers/">Class Vouchers</NavDropdown.Item>
							<NavDropdown.Item href="https://sewconfident.co.uk/gift-vouchers-2/">Gift Vouchers</NavDropdown.Item>
						</DropdownSubmenu>
						

					</NavDropdownMenu>
					<NavDropdownMenu title="Social" id="collasible-nav-dropdown">
						<NavDropdown.Item href="https://sewconfident.co.uk/about-sew-confident/">
							About Us
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/blog/">
							Blog
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/our-sew-confident-family">
							Our Sew Confident Family
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/vip-membership">
							VIP Membership
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/press">
							In the Press
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/reviews/">
							Reviews
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/instagram">
							Gallery
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/blogtutorials">
							Tutorials
						</NavDropdown.Item>
						<NavDropdown.Item href="https://sewconfident.co.uk/charity/">
							Charity
						</NavDropdown.Item>

					</NavDropdownMenu>

					<Nav.Link href="https://sewconfident.co.uk/own-your-own-studio/">Franchise</Nav.Link>
					<Nav.Link href="https://sewconfident.co.uk/contact-us/">Contact Us</Nav.Link>

				</Nav>
			</Navbar.Collapse>
			<div className={"nav-right-block"}>
				<div className={"search-block"}>
					<NavHashLink
						to={
							makeUrl(
								!!props.match.params.invite === true ? "/home" : "/",
								props.match.params.invite
							) + "#classes-search"
						}
					>
						<i className="fas fa-search"></i>
					</NavHashLink>
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
					{(cart.length > 0 && !!token) ||
						(props.cartItems.length > 0 && !token) ? (
						<span className={"counter"}></span>
					) : null}
				</div>
			</div>
		</Navbar>
	);
}
function mapStateToProps(state) {
	return {
		cartItems: state.cart.items,
	};
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
