defmodule QuestLog.Journal do
  @moduledoc """
  The Journal context.
  """

  require Logger
  import Ecto.Query, warn: false
  alias QuestLog.Repo
  alias QuestLog.Journal.Entry

  def list_entries() do
    Entry |> Repo.all()
  end

  def fetch_entry(id) do
    Entry |> Repo.get(id)
  end

  def data() do
    Dataloader.Ecto.new(Repo, query: &query/2)
  end

  def query(queryable, _params) do
    queryable
  end
end
