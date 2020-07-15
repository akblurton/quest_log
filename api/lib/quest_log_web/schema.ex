defmodule QuestLogWeb.Schema do
  use Absinthe.Schema
  alias QuestLogWeb.Schema.Types.{AccountsTypes, JournalTypes}
  alias QuestLog.{Accounts, Journal}

  import_types(AccountsTypes)
  import_types(JournalTypes)

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(Journal, Journal.data())
      |> Dataloader.add_source(Accounts, Accounts.data())

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
