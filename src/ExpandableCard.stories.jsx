import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import ExpandableCard from './ExpandableCard';


class ExpandableCardDemo extends React.PureComponent {

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
    this.setState(state => {
      return {
        expanded: !state.expanded,
      };
    });
  };

  render() {
    const { expanded, content } = this.state;

    return (
      <ExpandableCard
        layer="flat"
        expandableContent={content}
        expanded={expanded}>
        <p>
          Cette carte peut afficher plus de détails.
          {' '}
          <a href="#" onClick={this.onToggleExpand}>
            {expanded ? 'Replier' : 'En savoir plus'}
          </a>
        </p>
      </ExpandableCard>
    );
  }

}


storiesOf('ExpandableCard', module)
  .add('Dans une carte', () => {
    return (
      <ExpandableCardDemo />
    );
  });
