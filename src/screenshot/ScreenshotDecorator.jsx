import React from "react";
import PropTypes from "prop-types";
import querystring from "query-string";
import addons from "@storybook/addons";

import bemModifiers from "../utils/bemModifiers";

import "./ScreenshotDecorator.scss";

export default class ScreenshotDecorator extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  state = {
    ...getInitialStateFromUrl()
  };

  channel = addons.getChannel();

  constructor(props, context) {
    super(props, context);
  }

  async emit(eventName) {
    this.channel.emit("screenshot/" + eventName);
    if (this.ws) {
      const realWs = await this.ws;
      realWs.send(eventName);
    }
  }

  onEnableScreenshot = () => {
    this.setState({ enabled: true });
  };

  onDisableScreenshot = () => {
    this.setState({ enabled: false });
  };

  componentDidMount() {
    const { eventWsUrl } = this.state;

    if (eventWsUrl) {
      this.ws = new Promise(resolve => {
        const ws = new WebSocket(eventWsUrl);

        ws.onmessage = message => {
          const name = message.data;
          if (name === "enable") {
            this.onEnableScreenshot();
          } else if (name === "disable") {
            this.onDisableScreenshot();
          }
        };

        ws.onopen = () => {
          ws.send("client-hello");
          resolve(ws);
        };
      });
    }

    this.channel.on("screenshot/enable", this.onEnableScreenshot);
    this.channel.on("screenshot/disable", this.onDisableScreenshot);

    this.emit("screenshot/mounted");

    // TODO Allow customization of ready event
    this.emit("screenshot/ready");
  }

  componentWillUnmount() {
    this.channel.removeListener("screenshot/enable", this.onEnableScreenshot);
    this.channel.removeListener("screenshot/disable", this.onDisableScreenshot);

    if (this.ws) {
      this.ws.then(async ws => {
        ws.send("client-bye-bye");
        ws.close();
      });
    }
  }

  render() {
    const { children } = this.props;
    const { enabled } = this.state;

    const className = bemModifiers("screenshot-decorator", {
      enabled
    });

    return <div className={className}>{children}</div>;
  }
}

function getInitialStateFromUrl() {
  const params = querystring.parse(window.location.search || "");
  return {
    screenshot: params.screenshot === "true",
    eventWsUrl: params.eventWsUrl || null
  };
}
