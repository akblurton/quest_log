import React, { Suspense, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PageLoader from "./Loaders/Page";
import NetworkLoader from "./Loaders/Network";
import ErrorBoundary from "./Boundaries/Page";
const Home = React.lazy(() => import("./pages/Home"));
const Compose = React.lazy(() => import("./pages/Compose"));
const Read = React.lazy(() => import("./pages/Read"));
const Settings = React.lazy(() => import("./pages/Settings"));

const Router = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Suspense fallback={<PageLoader />}>
      <button onClick={() => setLoading((l) => !l)}>TOGGLE LOAD</button>
      <NetworkLoader on={loading} />
      <ErrorBoundary>
        <BrowserRouter>
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Router;
