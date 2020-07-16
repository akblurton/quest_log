import {
  createClient,
  Provider as URQLProvider,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";

const isServerSide = typeof window === "undefined";
// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide
    ? JSON.parse(window.atob(window.__URQL_DATA__))
    : undefined,
});

/* global process */
const client = createClient({
  suspense: isServerSide,
  url: isServerSide ? process.env.API_HOST : "/api",
  exchanges: [
    !isServerSide && devtoolsExchange,
    dedupExchange,
    cacheExchange(),
    ssr,
    fetchExchange,
  ].filter(Boolean),
});

export { client, ssr, URQLProvider };
