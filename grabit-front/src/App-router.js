import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./Pages/LandingPage"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const Request = lazy(() => import("./Pages/Request"));
const Assign = lazy(() => import("./Pages/Assignements"));

export default function router() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/Request" component={Request} />
          <Route path="/Assignements" component={Assign} />
        </Switch>
      </Suspense>
    </Router>
  );
}
