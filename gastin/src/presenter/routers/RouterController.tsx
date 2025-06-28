import { Route, Router } from "@solidjs/router";
import { Component } from "solid-js";
import { HomePage } from "@/presenter/pages/HomePage/index";
import HelpPage from "../pages/HelpPage";

export const RouterController: Component = () => {
  return <Router>
    <Route path="/" component={HomePage} />
    <Route path="/help" component={HelpPage} />
  </Router>
}
