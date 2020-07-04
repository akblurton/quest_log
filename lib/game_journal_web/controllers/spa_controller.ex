defmodule GameJournalWeb.SpaController do
  use GameJournalWeb, :controller
  action_fallback GameJournalWeb.FallbackController

  def index(conn, _params) do
    conn
    |> put_resp_content_type("text/html")
    |> send_file(200, Path.join(:code.priv_dir(:game_journal), "static/index.html"))
  end
end
