import React from "react";
import PropTypes from "prop-types";
import { noop } from "lodash-es";

class ReCaptchaLibLoader {
  started = false;
  lib = null;

  async get() {
    if (!this.started) {
      this.started = true;

      this.lib = new Promise((resolve) => {
        window.onReCaptchaLoadedV2 = () => {
          delete window.onReCaptchaLoadedV2;
          resolve(window.grecaptcha);
        };
      });

      // Add the reCaptcha script
      const reCaptchaScript = document.createElement("script");
      reCaptchaScript.async = true;
      reCaptchaScript.defer = true;
      reCaptchaScript.src = "https://www.google.com/recaptcha/api.js?render=explicit&onload=onReCaptchaLoadedV2";
      document.getElementsByTagName("head")[0].appendChild(reCaptchaScript);
    }

    return this.lib;
  }
}

const reCaptchaLibLoader = new ReCaptchaLibLoader();

export default class ReCaptcha extends React.PureComponent {
  static propTypes = {
    siteKey: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(["light", "dark"]).isRequired,
    size: PropTypes.oneOf(["normal", "compact"]).isRequired,
    type: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onExpire: PropTypes.func,
  };

  static defaultProps = {
    theme: "light",
    size: "normal",
    type: "image",
    badge: "bottomright",
    onSuccess: noop,
    onExpire: noop,
  };

  containerElement = React.createRef();
  captchaApi = null;
  widgetId = null;

  state = {
    loaded: false,
  };

  cleanContainerElement() {
    const range = document.createRange();
    range.selectNodeContents(this.containerElement.current);
    range.deleteContents();
  }

  addRenderingElement() {
    const renderingElement = document.createElement("div");
    this.containerElement.current.appendChild(renderingElement);
    return renderingElement;
  }

  onSuccess = (token) => {
    this.props.onSuccess(token);
  };

  onExpire = () => {
    this.props.onExpire();
  };

  componentDidMount() {
    reCaptchaLibLoader.get().then((captchaApi) => {
      this.captchaApi = captchaApi;

      this.setState({
        loaded: true,
      });
    });
  }

  componentDidUpdate() {
    // Reset the token
    this.onExpire();

    // This is an update: remove any previous captcha
    this.cleanContainerElement();

    // Render if the library is loaded
    if (this.state.loaded) {
      const { siteKey, type, theme, size } = this.props;

      // Render the Captcha in a new element each time.
      // A new element is required each time. Otherwise, the captcha lib fails.
      const renderingElement = this.addRenderingElement();
      this.widgetId = this.captchaApi.render(renderingElement, {
        sitekey: siteKey,
        type,
        theme,
        size,
        badge: "inline",
        callback: this.onSuccess,
        "expired-callback": this.onExpire,
      });
    }
  }

  render() {
    return <div className="recaptcha" ref={this.containerElement} />;
  }
}
