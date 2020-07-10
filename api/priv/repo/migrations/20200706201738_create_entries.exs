defmodule QuestLog.Repo.Migrations.CreateEntries do
  use Ecto.Migration

  def change do
    create table(:entries) do
      add :title, :string
      add :summary, :text
      add :whats_next, :text
      add :user_id, references(:users, on_delete: :nothing)
      add :game_id, references(:games, on_delete: :nothing)

      timestamps()
    end

    create index(:entries, [:user_id])
    create index(:entries, [:game_id])
  end
end
