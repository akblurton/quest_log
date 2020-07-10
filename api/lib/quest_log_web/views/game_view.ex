defmodule QuestLogWeb.GameView do
  use QuestLogWeb, :view
  alias QuestLogWeb.GameView

  def render("index.json", %{games: games}) do
    %{data: render_many(games, GameView, "game.json")}
  end

  def render("show.json", %{game: game}) do
    %{data: render_one(game, GameView, "game.json")}
  end

  def render("game.json", %{game: game}) do
    %{id: game.id, name: game.name, platform: game.platform, release_date: game.release_date}
  end
end
