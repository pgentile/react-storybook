import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function MicroFrontend({ id, manifestUrl }) {
  const rootRef = useRef();
  const unmountRef = useRef();

  useEffect(() => {
    const load = async () => {
      const { scriptUrl, namespace } = await retrieveManifest(manifestUrl);
      loadScript(id, scriptUrl, () => {
        const { mount, unmount } = window?.[namespace] ?? {};

        unmountRef.current = unmount;

        if (mount) {
          const root = rootRef.current;
          mount(root);
        }
      });
    };

    const unload = () => {
      const unmount = unmountRef.current;
      if (unmount) {
        const root = rootRef.current;
        unmount(root);
      }
    };

    load();
    return () => unload();
  }, [id, manifestUrl]);

  return <div id={`micro-frontend-root-${id}`} ref={rootRef} />;
}

MicroFrontend.propTypes = {
  id: PropTypes.string.isRequired,
  manifestUrl: PropTypes.string.isRequired
};

async function retrieveManifest(manifestUrl) {
  // This is a mock
  console.info("Loading", manifestUrl); // eslint-disable-line no-console
  return {
    scriptUrl: "https://eum.instana.io/eum.js",
    namespace: "instana"
  };
}

async function loadScript(id, scriptUrl, onLoad, onError) {
  const elementId = `micro-frontend-script-${id}`;

  if (document.getElementById(elementId)) {
    onLoad();
    return;
  }

  const script = document.createElement("script");
  script.id = elementId;
  script.src = scriptUrl;
  script.async = true;

  // Fake namespace
  window["instana"] = {
    mount: root => {
      console.info("Mount into", root); // eslint-disable-line no-console
      root.innerHTML = `Mounted ${id}`;
    },
    unmount: root => {
      console.info("Unmount into", root); // eslint-disable-line no-console
    }
  };

  const headOrBody = document.head ?? document.body;
  headOrBody.appendChild(script);

  script.addEventListener("load", () => onLoad());
  script.addEventListener("error", () => onError());
}
