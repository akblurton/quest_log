FROM bitwalker/alpine-elixir-phoenix:1.10.3 as dev
RUN mix local.hex --force
RUN mix local.rebar --force
RUN npm i -g yarn
ENV MIX_ENV=prod

WORKDIR /app
COPY mix.exs mix.lock ./
RUN mix deps.get
RUN mix deps.compile

WORKDIR /app/assets/
COPY ./assets/package.json ./assets/yarn.lock ./
RUN yarn
COPY ./assets ./
ENV NODE_ENV=production
RUN yarn deploy
WORKDIR /app
COPY . ./
RUN mix phx.digest
RUN mix release


# ---- Application Stage ----
FROM bitwalker/alpine-elixir:1.10.3 AS app

# Copy over the build artifact from the previous step and create a non root user
WORKDIR /bin
RUN wget -q "https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh"
RUN chmod +x ./wait-for-it.sh

WORKDIR /app
COPY --from=dev /app/_build .
COPY run.sh ./
RUN chmod +x ./run.sh

# Run the Phoenix app
EXPOSE 4000
ENTRYPOINT [ "/app/run.sh" ]
