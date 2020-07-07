#!/bin/sh

cd /bin
wget -q "https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh"
chmod +x ./wait-for-it.sh

cd /app

mix ecto.create
mix ecto.migrate
bash
