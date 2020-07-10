defmodule QuestLog.Repo do
  use Ecto.Repo,
    otp_app: :quest_log,
    adapter: Ecto.Adapters.Postgres
end
