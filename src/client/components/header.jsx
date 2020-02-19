import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => (
  <header>
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Navbar.Brand className="mr-5">ARDMOR INC.</Navbar.Brand>
      <Nav className="mr-auto">
        <Link className="nav-item nav-link" to="/home">
          Home
        </Link>
        <Link className="nav-item nav-link" to="/project">
          My Quote Sheet
        </Link>
      </Nav>
    </Navbar>
  </header>
);

export default Header;
