defmodule QuestLog.Journal.Entry do
  use Ecto.Schema
  import Ecto.Changeset

  schema "entries" do
    field :summary, :string
    field :title, :string
    field :whats_next, :string
    field :user_id, :id
    field :game_id, :id

    timestamps()
  end

  @doc false
  def changeset(entry, attrs) do
    entry
    |> cast(attrs, [:title, :summary, :whats_next])
    |> validate_required([:title, :summary, :whats_next])
  end
end
