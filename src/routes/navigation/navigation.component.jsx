import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ReactComponent as CrwnLogo } from "../../components/assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Container className="navigation">
          <Navbar.Brand href="/" className="logo-container">
            <CrwnLogo className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end nav-links-container"
          >
            <Nav className="lg-auto">
              <Nav.Link href="/">
                <h5>HOME</h5>
              </Nav.Link>
              <Nav.Link href="/auth">
                <h5>SIGN IN</h5>
              </Nav.Link>
              <Nav.Link href="/shop">
                <h5>SHOP</h5>
              </Nav.Link>
              <Nav.Link href="/contact">
                <h5>CONTACT</h5>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
