defmodule QuestLog.Journal.HtmlSanitizerTest do
  use ExUnit.Case, async: true
  alias QuestLog.Journal.HtmlSanitizer

  describe "&HtmlSanitizer.process/1" do
    test "it should fully scrub <script> tags from input" do
      input = "<script>window.alert(\"xss\")</script>"
      assert HtmlSanitizer.process(input) == ""
    end

    test "it should fully scrub <style> tags from input" do
      input = "<style>html { display: none }</style>"
      assert HtmlSanitizer.process(input) == ""
    end

    test "it should remove any and invalid formatting tags but keep content" do
      input = "<b>Hello <i>world</i> <code>foo <u>bar</u></code>"
      assert HtmlSanitizer.process(input) == "Hello world foo bar"
    end

    test "it should keep allowed formatting and block tags but remove attributes" do
      input = String.trim("""
        <ul className="my-list">
          <li onClick="javascript:alert()">
            <strong style="position: absolute">
              <em id="form">Hello World</em>
            </strong>
          </li>
        </ul>
      """)
      expected = String.trim("""
        <ul>
          <li>
            <strong>
              <em>Hello World</em>
            </strong>
          </li>
        </ul>
      """)

      assert HtmlSanitizer.process(input) == expected
    end
  end
end
