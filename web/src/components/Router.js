import React, { useState } from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PageLoader from "./Loaders/Page";
import NetworkLoader from "./Loaders/Network";
import ErrorBoundary from "./Boundaries/Page";
const Home = loadable(() => import("./pages/Home"), {
  fallback: <PageLoader />,
});
const Compose = loadable(() => import("./pages/Compose"), {
  fallback: <PageLoader />,
});
const Read = loadable(() => import("./pages/Read"), {
  fallback: <PageLoader />,
});
const Settings = loadable(() => import("./pages/Settings"), {
  fallback: <PageLoader />,
});

const MyRouter = ({ Router = BrowserRouter }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <button onClick={() => setLoading((l) => !l)}>TOGGLE LOAD</button>
      <NetworkLoader on={loading} />
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route path="/new">
              <Compose />
            </Route>
            <Route path="/read">
              <Read />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="*">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ErrorBoundary>
    </>
  );
};

MyRouter.propTypes = {
  Router: PropTypes.func,
};

export default MyRouter;
