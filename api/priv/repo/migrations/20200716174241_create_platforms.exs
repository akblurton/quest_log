defmodule QuestLog.Repo.Migrations.CreatePlatforms do
  use Ecto.Migration

  def change do
    create table(:platforms) do
      add :name, :string
      add :release_date, :date
      add :company_id, references(:companies, on_delete: :nothing)

      timestamps()
    end

    create index(:platforms, [:company_id])
  end
end
