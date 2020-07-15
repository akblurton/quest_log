defmodule QuestLogWeb.Schema.Resolvers.Journal do
  def list_entries(_parent, _args, _resolution) do
    {:ok, QuestLog.Journal.list_entries()}
  end

  def fetch_entry(_parent, args, _resolution) do
    case QuestLog.Journal.fetch_entry(args.id) do
      nil -> {:error, :not_found}
      entry -> {:ok, entry}
    end
  end
end
