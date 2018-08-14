import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import ExpandableCard from './ExpandableCard';


class ExpandableCardDemo extends React.PureComponent {

  static propTypes = {
    foldable: PropTypes.bool
  };

  static defaultProps = {
    foldable: false
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

  onToggleExpand = event => {
    event.preventDefault();
    this.toogleExpand();
  };

  toogleExpand = () => {
    this.setState(state => {
      return {
        expanded: !state.expanded,
      };
    });
  };

  render() {
    const { foldable } = this.props;
    const { expanded, content } = this.state;

    return (
      <ExpandableCard
        layer="flat"
        expandableContent={content}
        expanded={expanded}
        onFold={foldable ? this.toogleExpand : null}>
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
  .add('main', () => {
    return (
      <ExpandableCardDemo />
    );
  })
  .add('Avec bouton pour repliage', () => {
    return (
      <ExpandableCardDemo foldable />
    );
  });
