defmodule QuestLogWeb.Schema.Types.LibraryTypes do
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]
  alias QuestLog.Library

  object :game do
    field :id, :id
    field :name, :string
    field :release_date, :date
    field :inserted_at, :naive_datetime
    field :updated_at, :naive_datetime
    field :company, :company, resolve: dataloader(Library)
    field :platform, :platform, resolve: dataloader(Library)
  end

  object :platform do
    field :id, :id
    field :name, :string
    field :release_date, :date
    field :inserted_at, :naive_datetime
    field :updated_at, :naive_datetime
    field :company, :company, resolve: dataloader(Library)
    field :games, list_of(:game), resolve: dataloader(Library)
  end

  object :company do
    field :id, :id
    field :name, :string
    field :inserted_at, :naive_datetime
    field :updated_at, :naive_datetime
    field :platforms, list_of(:platform), resolve: dataloader(Library)
    field :games, list_of(:game), resolve: dataloader(Library)
  end
end
