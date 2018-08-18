import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash-es/debounce";

export default class DebouncedInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    debounceDelay: PropTypes.number.isRequired
  };

  static defaultProps = {
    debounceDelay: 500
  };

  state = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onChange, debounceDelay } = nextProps;

    if (onChange !== prevState.onChange || debounceDelay !== prevState.debounceDelay) {
      let onChangeDebounced = null;

      if (onChange) {
        if (debounceDelay > 0) {
          const debouncer = debounce(event => {
            return onChange(event);
          }, debounceDelay);

          onChangeDebounced = event => {
            event.persist();
            debouncer(event);
          };
        } else {
          onChangeDebounced = onChange;
        }
      }

      return {
        onChangeDebounced,
        onChange,
        debounceDelay
      };
    }

    return null;
  }

  render() {
    const { onChangeDebounced: onChange } = this.state;
    const props = { ...this.props, onChange };
    delete props.debounceDelay;

    return <input {...props} />;
  }
}
