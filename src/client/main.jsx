import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header";
import Routes from "./components/routes";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

ReactDOM.render(
  <Container>
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  </Container>,
  document.getElementById("index")
);
/*
import SheetEditor from "./components/sheet-editor";

ReactDOM.render(<SheetEditor />, document.getElementById("index"));
*/
