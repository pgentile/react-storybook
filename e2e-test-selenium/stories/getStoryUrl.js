import querystring from "query-string";

jest.setTimeout(60 * 1000);

export default function getStoryUrl(selectedKind, selectedStory) {
  const q = querystring.stringify({
    selectedKind,
    selectedStory
  });
  return `http://localhost:6006/iframe.html?${q}`;
}
