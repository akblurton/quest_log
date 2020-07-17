defmodule QuestLog.Library.Company do
  use Ecto.Schema
  import Ecto.Changeset
  alias QuestLog.Library.{Game, Platform}

  schema "companies" do
    field :name, :string

    has_many :platforms, Platform
    has_many :games, Game

    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [:name])
    |> cast_assoc(:platforms, with: &Platform.changeset/2)
    |> cast_assoc(:games, with: &Game.changeset/2)
    |> validate_required([:name])
  end

  def associate(company, %Platform{} = platform) do
    company
    |> cast(%{}, [])
    |> put_assoc(:platforms, [platform | company.platforms])
  end

  def associate(company, %Game{} = game) do
    company
    |> cast(%{}, [])
    |> put_assoc(:games, game)
  end
end
