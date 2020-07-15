defmodule QuestLogWeb.Schema.Types.AccountsTypes do
  use Absinthe.Schema.Notation
  alias QuestLogWeb.Schema.Resolvers.Accounts

  object :user do
    field :name, :string
  end

  object :session do
    field :access_token, non_null(:string)
    field :refresh_token, non_null(:string)
  end

  object :accounts_queries do
    @desc "Get logged in user's profile"
    field :me, :user do
      resolve(&Accounts.me/3)
    end
  end

  object :accounts_mutations do
    @desc "Login to account"
    field :login, type: :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&Accounts.login/3)
    end
  end
end
