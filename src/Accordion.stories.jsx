import React from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react";

import Accordion, { AccordionPanel } from "./Accordion";

storiesOf("Accordion", module)
  .add("only one panel expandable", () => {
    return <AccordionDemo uniqueExpandable />;
  })
  .add("many panels expandable", () => {
    return <AccordionDemo uniqueExpandable={false} />;
  });

function AccordionDemo({ uniqueExpandable }) {
  return (
    <Accordion uniqueExpandable={uniqueExpandable}>
      <AccordionPanel id="panel1" title="Panel 1" initiallyExpanded>
        This is the first panel
      </AccordionPanel>
      <AccordionPanel id="panel2" title="Panel 2">
        This is the second panel
      </AccordionPanel>
      <AccordionPanel id="panel3" title="Panel 3">
        This is the third panel
      </AccordionPanel>
    </Accordion>
  );
}

AccordionDemo.propTypes = {
  uniqueExpandable: PropTypes.bool.isRequired
};
