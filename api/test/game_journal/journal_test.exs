defmodule AdventureLog.JournalTest do
  use AdventureLog.DataCase

  alias AdventureLog.Journal

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
