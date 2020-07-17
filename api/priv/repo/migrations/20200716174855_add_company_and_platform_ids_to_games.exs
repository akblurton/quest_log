defmodule QuestLog.Repo.Migrations.AddCompanyAndPlatformIdsToGames do
  use Ecto.Migration

  def change do
    alter table("games") do
      add :company_id, references(:companies, on_delete: :nothing)
      add :platform_id, references(:platforms, on_delete: :nothing)
      remove :platform
    end
  end
end
