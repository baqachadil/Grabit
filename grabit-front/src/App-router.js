import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./Pages/LandingPage"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));

export default function router() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Suspense>
    </Router>
  );
}
