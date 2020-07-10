# In this file, we load production configuration and secrets
# from environment variables. You can also hardcode secrets,
# although such is generally not recommended and you have to
# remember to add this file to your .gitignore.
import Config

username =
  System.get_env("DATABASE_USERNAME") ||
    raise """
    environment variable DATABASE_USERNAME is missing.
    """

password =
  System.get_env("DATABASE_PASSWORD") ||
    raise """
    environment variable DATABASE_PASSWORD is missing.
    """

hostname =
  System.get_env("DATABASE_HOST") ||
    raise """
    environment variable DATABASE_HOST is missing.
    """

database =
  System.get_env("DATABASE_NAME") ||
    raise """
    environment variable DATABASE_NAME is missing.
    """

config :adventure_log, AdventureLog.Repo,
  # ssl: true,
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  username: username,
  password: password,
  hostname: hostname,
  database: database

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
    raise """
    environment variable SECRET_KEY_BASE is missing.
    You can generate one by calling: mix phx.gen.secret
    """

host = System.get_env("HOST") || "localhost"
config :adventure_log, AdventureLogWeb.Endpoint, url: [host: host]

config :adventure_log, AdventureLogWeb.Endpoint,
  http: [
    port: String.to_integer(System.get_env("PORT") || "4000"),
    transport_options: [socket_opts: [:inet6]]
  ],
  secret_key_base: secret_key_base

# ## Using releases (Elixir v1.9+)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:
#
#     config :adventure_log, AdventureLogWeb.Endpoint, server: true
#
# Then you can assemble a release by calling `mix release`.
# See `mix help release` for more information.
