defmodule QuestLogWeb.Schema.Resolvers.Accounts do
  alias QuestLog.Accounts

  def login(_parent, args, _context) do
    case Accounts.login(args.email, args.password) do
      {:ok, access_token, refresh_token} ->
        {:ok, %{access_token: access_token, refresh_token: refresh_token}}

      error ->
        error
    end
  end

  def me(_parent, _args, %{context: %{current_user: current_user}}) do
    {:ok, current_user}
  end

  def me(_, _, _), do: {:error, :unauthorized}
end
