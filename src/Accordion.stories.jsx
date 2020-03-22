import React from "react";
import PropTypes from "prop-types";

import Accordion, { AccordionPanel } from "./Accordion";

export default {
  title: "Accordion",
  component: Accordion,
};

export const onlyOnePanelExpandable = () => {
  return <AccordionDemo uniqueExpandable />;
};

export const manyPanelsExpandable = () => {
  return <AccordionDemo uniqueExpandable={false} />;
};

function AccordionDemo({ uniqueExpandable }) {
  return (
    <Accordion uniqueExpandable={uniqueExpandable}>
      <AccordionPanel id="panel1" title="Panel 1" initiallyExpanded>
        <p>This is the first panel</p>
      </AccordionPanel>
      <AccordionPanel id="panel2" title="Panel 2">
        <p>This is the second panel</p>
      </AccordionPanel>
      <AccordionPanel id="panel3" title="Panel 3">
        <p>This is the third panel</p>
      </AccordionPanel>
    </Accordion>
  );
}

AccordionDemo.propTypes = {
  uniqueExpandable: PropTypes.bool.isRequired,
};
