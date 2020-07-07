defmodule AdventureLog.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      AdventureLog.Repo,
      # Start the Telemetry supervisor
      AdventureLogWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: AdventureLog.PubSub},
      # Start the Endpoint (http/https)
      AdventureLogWeb.Endpoint
      # Start a worker by calling: AdventureLog.Worker.start_link(arg)
      # {AdventureLog.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: AdventureLog.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    AdventureLogWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
