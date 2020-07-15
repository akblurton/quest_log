import {
  createClient,
  Provider as URQLProvider,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

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
  exchanges: [dedupExchange, cacheExchange(), ssr, fetchExchange],
});

export { client, ssr, URQLProvider };
