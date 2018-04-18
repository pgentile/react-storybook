import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import styles from './SuperRadio.scss';


export default class SuperRadio extends React.PureComponent {

  static propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    description: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static counter = 0;

  constructor(props) {
    super(props);

    SuperRadio.counter++;

    this.state = {
      id: `super-radio-${SuperRadio.counter}`,
    };
  }

  render() {
    const { label, icon, description, checked, onChange } = this.props;
    const { id } = this.state;

    return (
      <div className={styles.superRadio}>
        <div className={styles.superRadio__radioElement}>
          <input type="radio" id={id} checked={checked} onChange={onChange} />
        </div>
        <div className={styles.superRadio__icon}>
          <label htmlFor={id}>
            <FontAwesomeIcon icon={icon} size="2x" />
          </label>
        </div>
        <div className={styles.superRadio__labelElement}>
          <p className={styles.superRadio__labelTitle}>
            <label htmlFor={id}>{label}</label>
          </p>
          {description && <p className={styles.superRadio__labelDescription}>{description}</p>}
        </div>
      </div>
    );
  }

}
