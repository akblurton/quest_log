defmodule QuestLogWeb.Schema.Types.JournalTypes do
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]
  alias QuestLog.Accounts
  alias QuestLogWeb.Schema.Resolvers.Journal

  import_types(Absinthe.Type.Custom)

  object :entry do
    field :id, :id
    field :title, :string
    field :summary, :string
    field :whats_next, :string
    field :inserted_at, :naive_datetime
    field :updated_at, :naive_datetime
    field :user, :user, resolve: dataloader(Accounts)
  end

  object :journal_queries do
    @desc "Get all journal_entries"
    field :entries, list_of(:entry) do
      resolve(&Journal.list_entries/3)
    end
  end
end
