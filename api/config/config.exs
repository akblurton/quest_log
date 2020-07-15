# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :quest_log,
  ecto_repos: [QuestLog.Repo]

# Configures the endpoint
config :quest_log, QuestLogWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "wFrQPC0sJ4uk503T6A/fVqE7u6rQlomabb8T1m6ovI3whOV8O0N4XTOLxKIgdsSW",
  render_errors: [view: QuestLogWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: QuestLog.PubSub,
  live_view: [signing_salt: "e0w5rcKe"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :quest_log, QuestLog.Accounts.Guardian,
  issuer: "quest_log",
  secret_key: "5Msf7nJjLq2ot98Wd/e8OCYjZG+6ttgnZtEBJhlERMKQpb+YDogOApeFXMup8ggR",
  verify_module: Guardian.JWT

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
