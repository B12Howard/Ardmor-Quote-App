import React from "react";
import { Switch, Route } from "react-router-dom";
import ProjectTable from "./data-table-project";
import Home from "./home";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/project" component={ProjectTable} />
    <Route path="*" component={Home} />
  </Switch>
);

export default Routes;
