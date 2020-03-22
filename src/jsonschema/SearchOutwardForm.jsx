import React from "react";
import PropTypes from "prop-types";
import Form from "react-jsonschema-form";

import schema from "./schemas/searchOutward.request.json";

export default class SearchOutwardForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { onSubmit } = this.props;

    const formData = {
      origin: {
        type: "RESARAIL",
        code: "FRNTE",
      },
      destination: {
        type: "RESARAIL",
        code: "FRLIL",
      },
      departureDate: "2018-12-24T06:00:00Z",
      passengers: [
        {
          type: "HUMAN",
        },
      ],
    };

    return <Form schema={schema} formData={formData} onSubmit={onSubmit} />;
  }
}
