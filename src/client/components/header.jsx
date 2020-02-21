import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => (
  <Navbar className="navbar-dark bg-primary">
    <Navbar.Brand className="mr-5">ARDMOR INC.</Navbar.Brand>
    <Nav>
      <Link className="nav-item nav-link" to="/home">
        Home
      </Link>
      <Link className="nav-item nav-link" to="/project">
        My Quote Sheet
      </Link>
    </Nav>
  </Navbar>
);

export default Header;
