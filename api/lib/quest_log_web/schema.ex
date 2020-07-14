defmodule QuestLogWeb.Schema do
  use Absinthe.Schema
  import_types(QuestLogWeb.Schema.ContentTypes)

  alias QuestLogWeb.Resolvers

  query do
    @desc "Get all journal_entries"
    field :journal_entries, list_of(:journal_entry) do
      resolve(&Resolvers.Journal.list_entries/3)
    end
  end
end
