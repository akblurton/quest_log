defmodule QuestLogWeb.Router do
  use QuestLogWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api" do
    pipe_through :api

    if Mix.env() == :dev do
      forward "/graphiql", Absinthe.Plug.GraphiQL, schema: QuestLogWeb.Schema
    end

    forward "/", Absinthe.Plug, schema: QuestLogWeb.Schema
  end

  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      live_dashboard("/dashboard", metrics: QuestLogWeb.Telemetry)
    end
  end
end
