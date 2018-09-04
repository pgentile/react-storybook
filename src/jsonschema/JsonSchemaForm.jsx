import React from "react";
import PropTypes from "prop-types";
import Form from "react-jsonschema-form";

import schema from "./schemas/search.request.json";

export default class JsonSchemaForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  };

  render() {
    const { onSubmit, onBlur } = this.props;

    const formData = {
      origin: {
        type: "RESARAIL",
        code: "FRNTE"
      },
      destination: {
        type: "RESARAIL",
        code: "FRLIL"
      },
      departureDate: "2018-12-24T06:00:00Z"
    };

    return <Form schema={schema} formData={formData} onSubmit={onSubmit} onBlur={onBlur} />;
  }
}
