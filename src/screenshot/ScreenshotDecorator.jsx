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
    enabled: isScreenshotEnabledInUrl()
  };

  channel = addons.getChannel();

  constructor(props, context) {
    super(props, context);

    this.channel.emit("screenshot/initialized");
  }

  onEnableScreenshot = () => {
    this.setState({ enabled: true });
  };

  onDisableScreenshot = () => {
    this.setState({ enabled: false });
  };

  componentDidMount() {
    this.channel.on("screenshot/enable", this.onEnableScreenshot);
    this.channel.on("screenshot/disable", this.onDisableScreenshot);

    this.channel.emit("screenshot/mounted");

    // TODO Allow customization of ready event
    this.channel.emit("screenshot/ready");
  }

  componentWillUnmount() {
    this.channel.removeListener("screenshot/enable", this.onEnableScreenshot);
    this.channel.removeListener("screenshot/disable", this.onDisableScreenshot);
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

function isScreenshotEnabledInUrl() {
  const params = querystring.parse(window.location.search || "");
  return params.screenshot === "true";
}
