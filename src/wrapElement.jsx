import React from "react";
import PropTypes from "prop-types";

export const propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string
};

export default function wrapElement(className, as = "div") {
  return WrappedComponent => {
    const WrapperComponent = class extends React.PureComponent {
      render() {
        const { as: overridenAs, className: otherClassName, ...otherProps } = this.props;

        return (
          <WrappedComponent as={overridenAs || as} className={`${className} ${otherClassName || ""}`} {...otherProps} />
        );
      }
    };

    WrapperComponent.propTypes = propTypes;
    WrapperComponent.displayName = `wrapElement(${WrappedComponent.displayName || WrappedComponent.name || "Unknown"})`;

    return WrapperComponent;
  };
}
