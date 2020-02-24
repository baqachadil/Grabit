import { Route, Switch } from "react-router-dom";
import React from "react";
import Profile from "../../components/Dashboard/Profile/Profile";
import Requests from "../../components/Dashboard/Requests";
import Adress from "../../components/Dashboard/Adress";
import FAQ from "../../components/Dashboard/FAQ";

export default function router({ currentUser }) {
  return (
    <Switch>
      <Route
        exact
        path="/dashboard/profile"
        render={() => <Profile currentUser={currentUser}></Profile>}
      />
      <Route path="/dashboard/requests" component={Requests} />
      <Route path="/dashboard/adress" component={Adress} />
      <Route path="/dashboard/faq" component={FAQ} />
    </Switch>
  );
}
