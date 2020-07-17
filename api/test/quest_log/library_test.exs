defmodule QuestLog.LibraryTest do
  use QuestLog.DataCase

  alias QuestLog.Library

  describe "games" do
    alias QuestLog.Library.Game

    @valid_attrs %{name: "some name", platform: 42, release_date: ~D[2010-04-17]}
    @update_attrs %{name: "some updated name", platform: 43, release_date: ~D[2011-05-18]}
    @invalid_attrs %{name: nil, platform: nil, release_date: nil}

    def game_fixture(attrs \\ %{}) do
      {:ok, game} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Library.create_game()

      game
    end

    test "list_games/0 returns all games" do
      game = game_fixture()
      assert Library.list_games() == [game]
    end

    test "get_game!/1 returns the game with given id" do
      game = game_fixture()
      assert Library.get_game!(game.id) == game
    end

    test "create_game/1 with valid data creates a game" do
      assert {:ok, %Game{} = game} = Library.create_game(@valid_attrs)
      assert game.name == "some name"
      assert game.platform == 42
      assert game.release_date == ~D[2010-04-17]
    end

    test "create_game/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Library.create_game(@invalid_attrs)
    end

    test "update_game/2 with valid data updates the game" do
      game = game_fixture()
      assert {:ok, %Game{} = game} = Library.update_game(game, @update_attrs)
      assert game.name == "some updated name"
      assert game.platform == 43
      assert game.release_date == ~D[2011-05-18]
    end

    test "update_game/2 with invalid data returns error changeset" do
      game = game_fixture()
      assert {:error, %Ecto.Changeset{}} = Library.update_game(game, @invalid_attrs)
      assert game == Library.get_game!(game.id)
    end

    test "delete_game/1 deletes the game" do
      game = game_fixture()
      assert {:ok, %Game{}} = Library.delete_game(game)
      assert_raise Ecto.NoResultsError, fn -> Library.get_game!(game.id) end
    end

    test "change_game/1 returns a game changeset" do
      game = game_fixture()
      assert %Ecto.Changeset{} = Library.change_game(game)
    end
  end

  describe "companies" do
    alias QuestLog.Library.Company

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def company_fixture(attrs \\ %{}) do
      {:ok, company} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Library.create_company()

      company
    end

    test "list_companies/0 returns all companies" do
      company = company_fixture()
      assert Library.list_companies() == [company]
    end

    test "get_company!/1 returns the company with given id" do
      company = company_fixture()
      assert Library.get_company!(company.id) == company
    end

    test "create_company/1 with valid data creates a company" do
      assert {:ok, %Company{} = company} = Library.create_company(@valid_attrs)
      assert company.name == "some name"
    end

    test "create_company/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Library.create_company(@invalid_attrs)
    end

    test "update_company/2 with valid data updates the company" do
      company = company_fixture()
      assert {:ok, %Company{} = company} = Library.update_company(company, @update_attrs)
      assert company.name == "some updated name"
    end

    test "update_company/2 with invalid data returns error changeset" do
      company = company_fixture()
      assert {:error, %Ecto.Changeset{}} = Library.update_company(company, @invalid_attrs)
      assert company == Library.get_company!(company.id)
    end

    test "delete_company/1 deletes the company" do
      company = company_fixture()
      assert {:ok, %Company{}} = Library.delete_company(company)
      assert_raise Ecto.NoResultsError, fn -> Library.get_company!(company.id) end
    end

    test "change_company/1 returns a company changeset" do
      company = company_fixture()
      assert %Ecto.Changeset{} = Library.change_company(company)
    end
  end

  describe "platforms" do
    alias QuestLog.Library.Platform

    @valid_attrs %{name: "some name", year_released: 42}
    @update_attrs %{name: "some updated name", year_released: 43}
    @invalid_attrs %{name: nil, year_released: nil}

    def platform_fixture(attrs \\ %{}) do
      {:ok, platform} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Library.create_platform()

      platform
    end

    test "list_platforms/0 returns all platforms" do
      platform = platform_fixture()
      assert Library.list_platforms() == [platform]
    end

    test "get_platform!/1 returns the platform with given id" do
      platform = platform_fixture()
      assert Library.get_platform!(platform.id) == platform
    end

    test "create_platform/1 with valid data creates a platform" do
      assert {:ok, %Platform{} = platform} = Library.create_platform(@valid_attrs)
      assert platform.name == "some name"
      assert platform.year_released == 42
    end

    test "create_platform/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Library.create_platform(@invalid_attrs)
    end

    test "update_platform/2 with valid data updates the platform" do
      platform = platform_fixture()
      assert {:ok, %Platform{} = platform} = Library.update_platform(platform, @update_attrs)
      assert platform.name == "some updated name"
      assert platform.year_released == 43
    end

    test "update_platform/2 with invalid data returns error changeset" do
      platform = platform_fixture()
      assert {:error, %Ecto.Changeset{}} = Library.update_platform(platform, @invalid_attrs)
      assert platform == Library.get_platform!(platform.id)
    end

    test "delete_platform/1 deletes the platform" do
      platform = platform_fixture()
      assert {:ok, %Platform{}} = Library.delete_platform(platform)
      assert_raise Ecto.NoResultsError, fn -> Library.get_platform!(platform.id) end
    end

    test "change_platform/1 returns a platform changeset" do
      platform = platform_fixture()
      assert %Ecto.Changeset{} = Library.change_platform(platform)
    end
  end
end
