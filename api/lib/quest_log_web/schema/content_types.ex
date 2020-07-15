defmodule QuestLogWeb.Schema.ContentTypes do
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]
  import_types(Absinthe.Type.Custom)
  alias QuestLog.Journal

  object :user do
    field :name, :string
  end

  object :session do
    field :token, :string
  end

  object :entry do
    field :id, :id
    field :title, :string
    field :summary, :string
    field :whats_next, :string
    field :inserted_at, :naive_datetime
    field :updated_at, :naive_datetime
    field :user, :user, resolve: dataloader(Journal)
  end
end
