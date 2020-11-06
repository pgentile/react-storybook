import PropTypes from "prop-types";
import FieldContainer from "./FieldContainer";
import InputField from "./InputField";

function innerField(props) {
  return <InputField {...props} placeholder="Valeur d'exemple" />;
}

export default {
  title: "Forms / FieldContainer",
  component: FieldContainer,
  argTypes: {
    as: {
      control: null,
    },
    label: {
      control: "text",
      defaultValue: "Example",
    },
    labelElement: {
      control: null,
    },
    children: {
      control: null,
    },
    render: {
      control: null,
      defaultValue: innerField,
    },
    errorMessage: {
      control: "text",
    },
    helpMessage: {
      control: "text",
    },
  },
};

function Template(args) {
  return <FieldContainer {...args} />;
}

export const Main = Template.bind({});

export const Error = Template.bind({});

Error.args = {
  errorMessage: "Nom inconnu",
};

export const Help = Template.bind({});

Help.args = {
  helpMessage: "Un peu d'aide, ça ne fait pas de mal",
};

export const ErrorAndHelp = Template.bind({});

ErrorAndHelp.args = {
  ...Error.args,
  ...Help.args,
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};

export const Optional = Template.bind({});

Optional.args = {
  optional: true,
};

export const CustomLabelElement = Template.bind({});

CustomLabelElement.args = {
  labelElement: CustomLabel,
  optional: true,
};

function CustomLabel({ children }) {
  return <span style={{ color: "green" }}>{children}</span>;
}

CustomLabel.propTypes = {
  children: PropTypes.node,
};
