defmodule QuestLogWeb.SpaController do
  use QuestLogWeb, :controller
  action_fallback QuestLogWeb.FallbackController

  def index(conn, _params) do
    conn
    |> put_resp_content_type("text/html")
    |> send_file(200, Path.join(:code.priv_dir(:quest_log), "static/index.html"))
  end
end
