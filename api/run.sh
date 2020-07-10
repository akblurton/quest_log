#!/bin/bash

/bin/wait-for-it.sh -t 0 ${DATABASE_HOST}:5432
./prod/rel/adventure_log/bin/adventure_log eval "AdventureLog.Release.migrate"
./prod/rel/adventure_log/bin/adventure_log start
