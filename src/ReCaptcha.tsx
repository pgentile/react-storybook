import { ReactElement, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";

interface ReCaptchaApi {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
}

declare global {
  interface Window {
    onReCaptchaLoadedV2?: () => void;

    grecaptcha: ReCaptchaApi;
  }
}

class ReCaptchaLibLoader {
  started = false;
  lib!: Promise<ReCaptchaApi>;

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

export default function ReCaptcha({
  siteKey,
  theme = "light",
  size = "normal",
  badge = "bottomright",
  onSuccess = noop,
  onExpire = noop,
}: ReCaptchaProps): ReactElement {
  const containerElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElement = ensureNotNull(containerElementRef.current);

    reCaptchaLibLoader.get().then((captchaApi) => {
      const renderingElement = document.createElement("div");
      containerElement.appendChild(renderingElement);

      captchaApi.render(renderingElement, {
        sitekey: siteKey,
        theme,
        size,
        badge,
        callback: onSuccess,
        "expired-callback": onExpire,
      });
    });

    return () => {
      const range = document.createRange();
      range.selectNodeContents(containerElement);
      range.deleteContents();
    };
  }, [onExpire, onSuccess, badge, siteKey, size, theme]);

  return <div className="recaptcha" ref={containerElementRef} />;
}

ReCaptcha.propTypes = {
  siteKey: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(["light", "dark"]),
  size: PropTypes.oneOf(["normal", "compact"]),
  badge: PropTypes.oneOf(["bottomright", "bottomleft", "inline"]),
  onSuccess: PropTypes.func,
  onExpire: PropTypes.func,
};

export type ReCaptchaProps = {
  siteKey: string;
  theme?: "light" | "dark";
  size?: "normal" | "compact";
  badge?: "bottomright" | "bottomleft" | "inline";
  onSuccess?: (token: string) => void;
  onExpire?: () => void;
};

function ensureNotNull<T>(value: T | null | undefined): T {
  if (value === null || typeof value === "undefined") {
    throw new Error("Undefined value");
  }
  return value;
}
