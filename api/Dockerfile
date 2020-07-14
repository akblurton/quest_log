FROM bitwalker/alpine-elixir-phoenix:1.10.3 as dev
RUN apk add --no-cache make gcc libc-dev
ENV MIX_ENV=prod

# Dependencies
WORKDIR /app
COPY ./mix.exs ./mix.lock ./
RUN mix deps.get
RUN mix deps.compile

# Compilation
COPY config/ ./config
COPY lib/ ./lib
COPY priv/ ./priv
RUN mix compile

# Release build
RUN mix phx.digest
RUN mix release


# ---- Application Stage ----
FROM bitwalker/alpine-elixir:1.10.3 AS app

# Copy over the build artifact from the previous step
WORKDIR /bin
RUN wget -q "https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh"
RUN chmod +x ./wait-for-it.sh

WORKDIR /opt/app
COPY --from=dev --chown=default:root /app/_build .
COPY ./run.sh ./
RUN chmod +x ./run.sh

# Ensure we don't run in an elevated context
USER default

# Run the Phoenix app
EXPOSE 4000
CMD [ "/bin/sh", "-c", "/opt/app/run.sh" ]
