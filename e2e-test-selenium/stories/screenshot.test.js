import WebSocket from "ws";

import getStoryUrl from "./getStoryUrl";
import writeScreenshot from "../selenium/writeScreenshot";

jest.setTimeout(120 * 1000);

describe("List stories", () => {
  let wsServer;

  beforeAll(async () => {
    wsServer = new WebSocket.Server({
      port: 20202
    });

    wsServer.on("connection", (ws, req) => {
      console.info("Connection received from", req.connection.remoteAddress);

      ws.send("server-hello");
      ws.send("enable");

      ws.on("message", message => {
        console.info("Received message", message, "from", req.connection.remoteAddress);
      });
    });
  });

  afterAll(() => {
    wsServer.close();
  });

  it("should capture the screenshot", async () => {
    // Open the storybook preview page
    await driver.get(getStoryUrl("Spinner", "main", "ws://localhost:20202"));
    await writeScreenshot("screenshot.png");
  });
});
