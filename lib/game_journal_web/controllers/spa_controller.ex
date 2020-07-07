defmodule AdventureLogWeb.SpaController do
  use AdventureLogWeb, :controller
  action_fallback AdventureLogWeb.FallbackController

  def index(conn, _params) do
    conn
    |> put_resp_content_type("text/html")
    |> send_file(200, Path.join(:code.priv_dir(:adventure_log), "static/index.html"))
  end
end
