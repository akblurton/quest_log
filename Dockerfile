FROM bitwalker/alpine-elixir-phoenix:1.10.3 as dev
RUN apk add --no-cache make gcc libc-dev
RUN npm i -g yarn
ENV MIX_ENV=prod

# Dependencies
WORKDIR /app/api
COPY ./api/mix.exs ./api/mix.lock ./
RUN mix deps.get
RUN mix deps.compile

# Backend Compilation
COPY /api/ ./
RUN mix compile

# Frontend Assets Build
WORKDIR /app/web/
COPY ./web/package.json ./web/yarn.lock ./
RUN yarn --frozen-lockfile
COPY ./web ./
ENV NODE_ENV=production
RUN yarn deploy

# Release build
WORKDIR /app/api/
RUN mix phx.digest
RUN mix release


# ---- Application Stage ----
FROM bitwalker/alpine-elixir:1.10.3 AS app

# Copy over the build artifact from the previous step
WORKDIR /bin
RUN wget -q "https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh"
RUN chmod +x ./wait-for-it.sh

WORKDIR /opt/app
COPY --from=dev --chown=default:root /app/api/_build .
COPY ./api/run.sh ./
RUN chmod +x ./run.sh

# Ensure we don't run in an elevated context
USER default

# Run the Phoenix app
EXPOSE 4000
ENTRYPOINT [ "/opt/app/run.sh" ]
