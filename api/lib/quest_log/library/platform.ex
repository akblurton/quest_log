defmodule QuestLog.Library.Platform do
  use Ecto.Schema
  import Ecto.Changeset
  alias QuestLog.Library.{Game, Company}

  schema "platforms" do
    field :name, :string
    field :release_date, :date

    belongs_to :company, Company
    has_many :games, Game

    timestamps()
  end

  @doc false
  def changeset(platform, attrs) do
    platform
    |> cast(attrs, [:name, :release_date])
    |> cast_assoc(:games, with: &Game.changeset/2)
    |> cast_assoc(:company, with: &Company.changeset/2)
    |> validate_required([:name, :release_date])
  end
end
