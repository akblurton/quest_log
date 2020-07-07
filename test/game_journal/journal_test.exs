defmodule AdventureLog.JournalTest do
  use AdventureLog.DataCase

  alias AdventureLog.Journal

  describe "users" do
    alias AdventureLog.Journal.User

    @valid_attrs %{email: "some email", name: "some name", password: "some password"}
    @update_attrs %{
      email: "some updated email",
      name: "some updated name",
      password: "some updated password"
    }
    @invalid_attrs %{email: nil, name: nil, password: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Journal.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Journal.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Journal.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Journal.create_user(@valid_attrs)
      assert user.email == "some email"
      assert user.name == "some name"
      assert user.password == "some password"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Journal.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Journal.update_user(user, @update_attrs)
      assert user.email == "some updated email"
      assert user.name == "some updated name"
      assert user.password == "some updated password"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Journal.update_user(user, @invalid_attrs)
      assert user == Journal.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Journal.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Journal.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Journal.change_user(user)
    end
  end

  describe "entries" do
    alias AdventureLog.Journal.Entry

    @valid_attrs %{summary: "some summary", title: "some title", whats_next: "some whats_next"}
    @update_attrs %{
      summary: "some updated summary",
      title: "some updated title",
      whats_next: "some updated whats_next"
    }
    @invalid_attrs %{summary: nil, title: nil, whats_next: nil}

    def entry_fixture(attrs \\ %{}) do
      {:ok, entry} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Journal.create_entry()

      entry
    end

    test "list_entries/0 returns all entries" do
      entry = entry_fixture()
      assert Journal.list_entries() == [entry]
    end

    test "get_entry!/1 returns the entry with given id" do
      entry = entry_fixture()
      assert Journal.get_entry!(entry.id) == entry
    end

    test "create_entry/1 with valid data creates a entry" do
      assert {:ok, %Entry{} = entry} = Journal.create_entry(@valid_attrs)
      assert entry.summary == "some summary"
      assert entry.title == "some title"
      assert entry.whats_next == "some whats_next"
    end

    test "create_entry/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Journal.create_entry(@invalid_attrs)
    end

    test "update_entry/2 with valid data updates the entry" do
      entry = entry_fixture()
      assert {:ok, %Entry{} = entry} = Journal.update_entry(entry, @update_attrs)
      assert entry.summary == "some updated summary"
      assert entry.title == "some updated title"
      assert entry.whats_next == "some updated whats_next"
    end

    test "update_entry/2 with invalid data returns error changeset" do
      entry = entry_fixture()
      assert {:error, %Ecto.Changeset{}} = Journal.update_entry(entry, @invalid_attrs)
      assert entry == Journal.get_entry!(entry.id)
    end

    test "delete_entry/1 deletes the entry" do
      entry = entry_fixture()
      assert {:ok, %Entry{}} = Journal.delete_entry(entry)
      assert_raise Ecto.NoResultsError, fn -> Journal.get_entry!(entry.id) end
    end

    test "change_entry/1 returns a entry changeset" do
      entry = entry_fixture()
      assert %Ecto.Changeset{} = Journal.change_entry(entry)
    end
  end
end
