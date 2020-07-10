#!/bin/bash

/bin/wait-for-it.sh -t 0 ${DATABASE_HOST}:5432
./prod/rel/quest_log/bin/quest_log eval "QuestLog.Release.migrate"
./prod/rel/quest_log/bin/quest_log start
