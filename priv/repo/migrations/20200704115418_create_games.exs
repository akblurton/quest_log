defmodule GameJournal.Repo.Migrations.CreateGames do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :name, :string
      add :platform, :integer
      add :release_date, :date

      timestamps()
    end

  end
end
