defmodule QuestLogWeb.Schema do
  use Absinthe.Schema
  import_types(QuestLogWeb.Schema.ContentTypes)
  alias QuestLog.Journal
  alias QuestLogWeb.Schema.Resolvers

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(Journal, Journal.data())

    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  query do
    @desc "Get all journal_entries"
    field :entries, list_of(:entry) do
      resolve(&Resolvers.Journal.list_entries/3)
    end

    @desc "Get logged in user's profile"
    field :me, :user do
      resolve(&Resolvers.Accounts.me/3)
    end
  end

  mutation do
    @desc "Login to account"
    field :login, type: :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&Resolvers.Accounts.login/3)
    end
  end
end
