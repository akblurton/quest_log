defmodule GameJournal.Library.Game do
  use Ecto.Schema
  import Ecto.Changeset

  schema "games" do
    field :name, :string
    field :platform, :integer
    field :release_date, :date

    timestamps()
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:name, :platform, :release_date])
    |> validate_required([:name, :platform, :release_date])
  end
end
