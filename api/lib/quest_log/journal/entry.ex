defmodule QuestLog.Journal.Entry do
  use Ecto.Schema
  import Ecto.Changeset

  schema "entries" do
    field :summary, :string
    field :title, :string
    field :whats_next, :string

    belongs_to :user, QuestLog.Accounts.User
    belongs_to :game, QuestLog.Library.Game
    timestamps()
  end

  @doc false
  def changeset(entry, attrs) do
    entry
    |> cast(attrs, [:title, :summary, :whats_next])
    |> cast_assoc(:user)
    |> validate_required([:title, :summary, :whats_next])
  end
end
