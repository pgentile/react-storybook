import React from "react";
import PropTypes from "prop-types";
import addons from "@storybook/addons";

const initialState = Object.freeze({
  enabled: false,
  initialized: false,
  mounted: false,
  ready: false
});

export default class ScreenshotPanel extends React.PureComponent {
  static propTypes = {
    api: PropTypes.object.isRequired
  };

  state = initialState;

  channel = addons.getChannel();

  onEnableScreenshot = () => {
    this.channel.emit("screenshot/enable");

    this.setState({ enabled: true });
  };

  onDisableScreenshot = () => {
    this.channel.emit("screenshot/disable");

    this.setState({ enabled: false });
  };

  onInitialized = () => this.setState({ initialized: true });

  onMounted = () => this.setState({ mounted: true });

  onReady = () => this.setState({ ready: true });

  onStoryChange = () => this.setState(initialState);

  componentDidMount() {
    this.channel.on("screenshot/initialized", this.onInitialized);
    this.channel.on("screenshot/mounted", this.onMounted);
    this.channel.on("screenshot/ready", this.onReady);

    this.removeStoryChangeListener = this.props.api.onStory(this.onStoryChange);
  }

  componentWillUnmount() {
    this.removeStoryChangeListener && this.removeStoryChangeListener();

    this.channel.removeListener("screenshot/ready", this.onReady);
    this.channel.removeListener("screenshot/mounted", this.onMounted);
    this.channel.removeListener("screenshot/initialized", this.onInitialized);
  }

  render() {
    const { enabled, initialized, mounted, ready } = this.state;
    return (
      <div>
        <div>
          {!enabled && <button onClick={this.onEnableScreenshot}>Enable screenshot mode</button>}
          {enabled && <button onClick={this.onDisableScreenshot}>Disable screenshot mode</button>}
        </div>
        <ul>
          <li>
            <b>Enabled:</b> {enabled ? "yes" : "no"}
          </li>
          <li>
            <b>Initialized:</b> {initialized ? "yes" : "no"}
          </li>
          <li>
            <b>Mounted:</b> {mounted ? "yes" : "no"}
          </li>
          <li>
            <b>Ready:</b> {ready ? "yes" : "no"}
          </li>
        </ul>
      </div>
    );
  }
}
