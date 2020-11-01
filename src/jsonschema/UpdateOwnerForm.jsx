import { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "react-jsonschema-form";

import schema from "./schemas/updateOwner.request.json";

export default class UpdateOwnerForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { onSubmit } = this.props;

    const formData = {};

    return <Form schema={schema} formData={formData} onSubmit={onSubmit} />;
  }
}
