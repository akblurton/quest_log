defmodule QuestLog.Journal.HtmlSanitizer do
  require HtmlSanitizeEx.Scrubber.Meta
  alias HtmlSanitizeEx.Scrubber.Meta
  alias HtmlSanitizeEx.Scrubber

  Meta.remove_cdata_sections_before_scrub()
  Meta.strip_comments()
  Meta.allow_tags_and_scrub_their_attributes(["li", "ul", "ol", "strong", "em"])

  def scrub({"script", _attributes, _children}), do: nil
  def scrub({"style", _attributes, _children}), do: nil

  Meta.strip_everything_not_covered()

  def process(html) when is_binary(html) do
    Scrubber.scrub(html, __MODULE__)
  end
end
