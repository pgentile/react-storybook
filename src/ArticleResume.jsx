import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import bemModifiers from "./utils/bemModifiers";

import "./ArticleResume.scss";

export default function ArticleResume({ children }) {
  const [hidden, setHidden] = useState(true);

  const onShowClick = useCallback(() => {
    setHidden(false);
  }, [setHidden]);

  const contentClass = bemModifiers("article-resume__content", {
    hidden
  });

  return (
    <div className="article-resume">
      <div className={contentClass}>{children}</div>
      {hidden && (
        <div className="article-resume__button-wrapper">
          <button className="article-resume__button" onClick={onShowClick}>
            Tout afficher
          </button>
        </div>
      )}
    </div>
  );
}

ArticleResume.propTypes = {
  children: PropTypes.node
};
