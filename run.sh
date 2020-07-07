#!/bin/bash

/bin/wait-for-it.sh -t 0 ${DATABASE_HOST}:5432
./prod/rel/game_journal/bin/game_journal eval "AdventureLog.Release.migrate"
./prod/rel/game_journal/bin/game_journal start
