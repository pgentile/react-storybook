import React from "react";
import PropTypes from "prop-types";
import { getDisplayName } from "recompose";

export default class FormFocusOnError extends React.Component {
  static propTypes = {
    as: PropTypes.elementType,
    children: PropTypes.func.isRequired
  };

  static defaultProps = {
    as: "div"
  };

  rootRef = React.createRef();

  focusOnError = () => {
    const rootElement = this.rootRef.current;
    if (rootElement) {
      const firstInvalidElement = rootElement.querySelector('*[aria-invalid="true"]');
      if (firstInvalidElement && firstInvalidElement.scrollIntoView) {
        firstInvalidElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  };

  render() {
    const { as: Element, children } = this.props;
    return <Element ref={this.rootRef}>{children(this.focusOnError)}</Element>;
  }
}

export function withFormFocusOnError(props = {}) {
  return Wrapped => {
    const wrapper = wrappedProps => {
      return (
        <FormFocusOnError {...props}>
          {focusOnError => <Wrapped {...wrappedProps} focusOnError={focusOnError} />}
        </FormFocusOnError>
      );
    };

    wrapper.displayName = `withFormFocusOnError(${getDisplayName(Wrapped)})`;

    return wrapper;
  };
}
