import React from "react";
import PropTypes from "prop-types";

export default function WebShareSample({ url, text, title }) {
  const onShareClick = async () => {
    await navigator.share({
      url,
      text,
      title,
    });
  };
  return (
    <div className="web-share">
      <button onClick={onShareClick}>Partager</button>
    </div>
  );
}

WebShareSample.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
};
