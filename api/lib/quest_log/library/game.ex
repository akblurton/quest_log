defmodule QuestLog.Library.Game do
  use Ecto.Schema
  import Ecto.Changeset
  alias QuestLog.Library.{Platform, Company}

  schema "games" do
    field :name, :string
    field :release_date, :date

    belongs_to :company, Company
    belongs_to :platform, Platform

    timestamps()
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:name, :release_date])
    |> cast_assoc(:company, with: &Company.changeset/2)
    |> cast_assoc(:platform, with: &Platform.changeset/2)
    |> validate_required([:name, :platform, :release_date])
  end
end
