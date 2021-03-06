const selectPossibleOembedLinkNodes = require("./selectPossibleOembedLinkNodes");
const MARKDOWN_AST = require("./.test/markdown");

describe("#selectPossibleOembedLinkNodes", () => {
  test("select only links that are the only child of a paragraph", () => {
    const possibleOembedLinks = selectPossibleOembedLinkNodes(MARKDOWN_AST);
    expect(possibleOembedLinks).toHaveLength(1);
    expect(possibleOembedLinks[0]).toMatchObject({
      type: "link",
      url: "https://www.instagram.com/p/Bof9WhgBmY2"
    });
  });

  test("select only links that inline code and prefixed with 'oembed:'", () => {
    const possibleOembedLinks = selectPossibleOembedLinkNodes(
      MARKDOWN_AST,
      true
    );
    expect(possibleOembedLinks).toHaveLength(2);
    expect(possibleOembedLinks[0]).toMatchObject({
      type: "inlineCode",
      url: "https://twitter.com/raae/status/1045394833001652225"
    });
    // allow space after 'oembed:'
    expect(possibleOembedLinks[1]).toMatchObject({
      type: "inlineCode",
      url: "https://www.instagram.com/p/Bof9WhgBmY2"
    });
  });
});
