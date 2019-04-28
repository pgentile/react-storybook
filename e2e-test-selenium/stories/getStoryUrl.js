import querystring from "query-string";
import { toId } from "@storybook/router/utils";

export default function getStoryUrl(selectedKind, selectedStory, eventWsUrl) {
  const id = selectedKind && selectedStory ? toId(selectedKind, selectedStory) : undefined;
  const q = querystring.stringify({
    id,
    screenshot: 1,
    eventWsUrl
  });
  return `http://localhost:6006/iframe.html?${q}`;
}
