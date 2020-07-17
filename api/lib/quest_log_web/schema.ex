defmodule QuestLogWeb.Schema do
  use Absinthe.Schema
  alias QuestLogWeb.Schema.Types.{AccountsTypes, JournalTypes, LibraryTypes}
  alias QuestLog.{Accounts, Journal, Library}

  import_types(Absinthe.Type.Custom)
  import_types(AccountsTypes)
  import_types(JournalTypes)
  import_types(LibraryTypes)

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(Journal, Journal.data())
      |> Dataloader.add_source(Accounts, Accounts.data())
      |> Dataloader.add_source(Library, Library.data())

    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  query do
    import_fields(:journal_queries)
    import_fields(:accounts_queries)
  end

  mutation do
    import_fields(:accounts_mutations)
  end
end
