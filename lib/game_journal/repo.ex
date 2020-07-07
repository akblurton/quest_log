defmodule AdventureLog.Repo do
  use Ecto.Repo,
    otp_app: :adventure_log,
    adapter: Ecto.Adapters.Postgres
end
