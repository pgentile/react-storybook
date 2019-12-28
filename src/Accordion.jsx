import React, { createContext, useContext, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useEffectOnce } from "react-use";
import noop from "lodash-es";

import Expandable from "./Expandable";
import ExpandableIcon from "./ExpandableIcon";

import "./Accordion.scss";

const Context = createContext({
  toggleExpanded: noop,
  isExpanded: () => false
});

export default function Accordion({ children, uniqueExpandable }) {
  const [expandedPanels, setExpandedPanels] = useState([]);

  const toggleExpanded = useCallback(
    id => {
      if (expandedPanels.includes(id)) {
        setExpandedPanels(expandedPanels.filter(item => item !== id));
      } else {
        if (uniqueExpandable) {
          setExpandedPanels([id]);
        } else {
          setExpandedPanels([...expandedPanels, id]);
        }
      }
    },
    [expandedPanels, uniqueExpandable]
  );

  const isExpanded = useCallback(id => expandedPanels.includes(id), [expandedPanels]);

  return (
    <div className="accordion">
      <Context.Provider value={{ isExpanded, toggleExpanded }}>{children}</Context.Provider>
    </div>
  );
}

Accordion.propTypes = {
  children: PropTypes.node,
  uniqueExpandable: PropTypes.bool.isRequired
};

Accordion.defaultProps = {
  uniqueExpandable: false
};

let accordionCounter = 1;

function generateAccordionUniqueId() {
  return `accordion-unique-id-${accordionCounter++}`;
}

export function AccordionPanel({ id, title, children, initiallyExpanded }) {
  const [uniqueId] = useState(() => generateAccordionUniqueId());
  const { isExpanded, toggleExpanded } = useContext(Context);

  useEffectOnce(() => {
    if (initiallyExpanded) {
      toggleExpanded(id);
    }
  });

  const onTitleClick = useCallback(() => toggleExpanded(id), [toggleExpanded, id]);

  const onTitleKeyPress = useCallback(
    event => {
      if (event.key === "Enter" || event.key === " ") {
        toggleExpanded(id);
      }
    },
    [toggleExpanded, id]
  );

  const expanded = isExpanded(id);

  return (
    <div className="accordion__panel">
      <div
        className="accordion__panel-title"
        tabIndex={0}
        onClick={onTitleClick}
        onKeyPress={onTitleKeyPress}
        role="button"
        aria-expanded={expanded ? "true" : "false"}
        aria-pressed={expanded ? "true" : "false"}
        aria-controls={uniqueId}
      >
        <div className="accordion__panel-title-content">{title}</div>
        <div className="accordion__panel-title-icon">
          <ExpandableIcon expanded={expanded} />
        </div>
      </div>
      <Expandable expanded={expanded} id={uniqueId}>
        <div className="accordion__panel-content">{children}</div>
      </Expandable>
    </div>
  );
}

AccordionPanel.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  initiallyExpanded: PropTypes.bool.isRequired,
  children: PropTypes.node
};

AccordionPanel.defaultProps = {
  initiallyExpanded: false
};
