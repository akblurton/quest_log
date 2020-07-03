defmodule GameJournal.Repo do
  use Ecto.Repo,
    otp_app: :game_journal,
    adapter: Ecto.Adapters.Postgres
end
