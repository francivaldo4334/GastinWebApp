import { Route, Router } from "@solidjs/router";
import { Component } from "solid-js";
import { HomePage } from "@/presenter/pages/HomePage";

export const RouterController: Component = () => {
  return <Router>
    <Route path="/" component={HomePage} />
  </Router>
}
