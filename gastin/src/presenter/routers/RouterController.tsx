import { Route, Router } from "@solidjs/router";
import { Component } from "solid-js";
import { HomePage } from "@/presenter/pages/HomePage/index";
import HelpPage from "../pages/HelpPage";
import { CategoriesPage } from "../pages/CategoriesPage";
import { ExpenditurePage } from "../pages/ExpenditurePage";

export const RouterController: Component = () => {
  return <Router>
    <Route path="/" component={HomePage} />
    <Route path="/help" component={HelpPage} />
    <Route path="/categories" component={CategoriesPage} />
    <Route path="/expenditures" component={ExpenditurePage} />
  </Router>
}
