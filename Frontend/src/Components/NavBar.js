import React from "react";
import "../App.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Badge from "@material-ui/core/Badge";
import { Button as MatBtn } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";

export default function NavBar() {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignin);

  const { cartItems } = cart;
  const { userInfo } = userSignin;

  const StyledBadge = withStyles((theme) =>
    createStyles({
      badge: {
        right: 0,
        top: 3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
        fontSize: "0.6em",
      },
    })
  )(Badge);

  const signOut = () => {
    dispatch(signout());
  };

  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand style={{ fontFamily: "system-ui" }}>
          <Link to="/">MaidMango </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>

            <NavDropdown title="Types" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">First Type</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Second Type</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Others</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/contact-us">Contact Us</Nav.Link>

            <Nav.Link href="/about-us">About</Nav.Link>
          </Nav>

          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}

          {userInfo ? (
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown1">
              <NavDropdown.Item>
                <Link className="dropdown" to="/profile">
                  Profile
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link className="dropdown" to="/orderhistory">
                  Your orders
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link className="dropdown" to="#signout" onClick={signOut}>
                  Sign out
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Link to="/signin">
                <MatBtn id="login" variant="text">
                  Login
                </MatBtn>
              </Link>

              <Link to="/register">
                <MatBtn id="signup" variant="text">
                  Signup
                </MatBtn>
              </Link>
            </>
          )}

          { userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin' id="basic-nav-dropdown1">

              <NavDropdown.Item>
                <Link className="dropdown" to="/productlist">Products</Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link className="dropdown" to="/orderlist">Orders</Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link className="dropdown" to="/userlist">User list</Link>
              </NavDropdown.Item>

            </NavDropdown>
          )  }

          <Link to="/cart">
            <IconButton style={{ margin: "6px" }} aria-label="cart">
              <StyledBadge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
