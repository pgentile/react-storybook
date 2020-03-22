import React, { Fragment } from "react";
import PropTypes from "prop-types";

import ExpandableCard from "./ExpandableCard";
import ExpandableIcon from "./ExpandableIcon";

class ExpandableCardDemo extends React.PureComponent {
  static propTypes = {
    expandable: PropTypes.bool,
  };

  state = {
    expanded: false,
    content: (
      <Fragment>
        <p>Voici du contenu dépliable.</p>
        <p>Voici du contenu dépliable.</p>
        <p>Voici du contenu dépliable.</p>
        <p>Voici du contenu dépliable.</p>
        <p>Voici du contenu dépliable.</p>
      </Fragment>
    ),
  };

  onToggleExpand = (event) => {
    event.preventDefault();
    this.toogleExpand();
  };

  toogleExpand = () => {
    this.setState((state) => {
      return {
        expanded: !state.expanded,
      };
    });
  };

  render() {
    const { expandable } = this.props;
    const { expanded, content } = this.state;

    return (
      <ExpandableCard
        layer="flat"
        expandableContent={content}
        expanded={expanded}
        onFold={expandable ? this.toogleExpand : null}
      >
        <p>
          Cette carte peut afficher plus de détails.{" "}
          <a href="#" onClick={this.onToggleExpand}>
            En savoir plus
          </a>
          &nbsp;
          <ExpandableIcon expanded={expanded} onClick={this.onToggleExpand} />
        </p>
      </ExpandableCard>
    );
  }
}

export default {
  title: "ExpandableCard",
  component: ExpandableCard,
  parameters: {
    storyshots: false,
  },
};

export const main = () => {
  return <ExpandableCardDemo />;
};

export const foldButton = () => {
  return <ExpandableCardDemo expandable />;
};
