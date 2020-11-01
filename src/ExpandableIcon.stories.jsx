import { useState, useCallback } from "react";

import ExpandableIcon from "./ExpandableIcon";

export default {
  title: "ExpandableIcon",
  component: ExpandableIcon,
  parameters: {
    storyshots: false,
  },
};

export const folded = () => {
  return <ExpandableIcon />;
};

export const unfolded = () => {
  return <ExpandableIcon expanded />;
};

export const demo = () => {
  return <ExpandableIconDemo />;
};

function ExpandableIconDemo() {
  const [expanded, setExpanded] = useState(false);

  const onClick = useCallback(() => setExpanded((value) => !value), []);

  return <ExpandableIcon expanded={expanded} onClick={onClick} />;
}
