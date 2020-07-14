defmodule QuestLogWeb.Schema.ContentTypes do
  use Absinthe.Schema.Notation
  import_types(Absinthe.Type.Custom)

  object :journal_entry do
    field :id, :id
    field :title, :string
    field :summary, :string
    field :whats_next, :string
    field :inserted_at, :naive_datetime
    field :updated_at, :naive_datetime
  end
end
