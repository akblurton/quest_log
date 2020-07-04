#!/bin/sh

cd /bin
wget -q "https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh"
chmod +x ./wait-for-it.sh

cd /app
# mix local.rebar --force
# mix local.hex --force
/bin/wait-for-it.sh -t 0 postgres:5432
mix ecto.create
mix ecto.migrate
mix phx.server