import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PageLoader from "./Loaders/Page";
import ErrorBoundary from "./Boundaries/Page";
const Home = React.lazy(() => import("./pages/Home"));
const Compose = React.lazy(() => import("./pages/Compose"));
const Read = React.lazy(() => import("./pages/Read"));
const Settings = React.lazy(() => import("./pages/Settings"));

const Router = () => (
  <Suspense fallback={<PageLoader />}>
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

export default Router;
