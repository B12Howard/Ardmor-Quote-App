import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header";
import Routes from "./components/routes";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Container fluid>
        <Header />
        <Routes />
      </Container>
    </BrowserRouter>
  </div>,
  document.getElementById("index")
);
/*
import SheetEditor from "./components/sheet-editor";

ReactDOM.render(<SheetEditor />, document.getElementById("index"));
*/
