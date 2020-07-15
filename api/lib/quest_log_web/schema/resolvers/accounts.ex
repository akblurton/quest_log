defmodule QuestLogWeb.Schema.Resolvers.Accounts do
  alias QuestLog.Accounts

  def login(_parent, args, _context) do
    case Accounts.login(args.email, args.password) do
      {:ok, token} -> {:ok, %{token: token}}
      error -> error
    end
  end

  def me(_parent, _args, %{context: %{current_user: current_user}}) do
    {:ok, current_user}
  end

  def me(_, _, _), do: {:error, :unauthorized}
end
