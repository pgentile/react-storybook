import React from "react";
import PropTypes from "prop-types";

const initialState = Object.freeze({
  enabled: false,
  mounted: false,
  ready: false
});

export default class ScreenshotPanel extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    channel: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired
  };

  state = initialState;

  onEnableScreenshot = () => {
    this.props.channel.emit("screenshot/enable");

    this.setState({ enabled: true });
  };

  onDisableScreenshot = () => {
    this.props.channel.emit("screenshot/disable");

    this.setState({ enabled: false });
  };

  onMounted = () => this.setState({ mounted: true });

  onReady = () => this.setState({ ready: true });

  onStoryChange = () => this.setState(initialState);

  componentDidMount() {
    this.props.channel.on("screenshot/mounted", this.onMounted);
    this.props.channel.on("screenshot/ready", this.onReady);

    this.removeStoryChangeListener = this.props.api.onStory(this.onStoryChange);
  }

  componentWillUnmount() {
    this.removeStoryChangeListener && this.removeStoryChangeListener();

    this.channel.removeListener("screenshot/ready", this.onReady);
    this.channel.removeListener("screenshot/mounted", this.onMounted);
  }

  render() {
    const { active } = this.props;
    const { enabled, mounted, ready } = this.state;

    if (!active) {
      return null;
    }

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
