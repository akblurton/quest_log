defmodule QuestLogWeb.Schema.Resolvers.Journal do
  def list_entries(_parent, _args, _resolution) do
    {:ok, QuestLog.Journal.list_entries()}
  end
end
