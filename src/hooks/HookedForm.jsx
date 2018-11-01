import React, { useState } from "react";
import PropTypes from "prop-types";

export default function HookedForm() {
  const firstName = useFormInput("firstName");
  const lastName = useFormInput("lastName");
  const acceptConditions = useCheckbox("acceptConditions");

  const onSubmit = event => {
    event.preventDefault();

    alert(
      JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value
      })
    );
  };

  const submittable = firstName.hasValue && lastName.hasValue && acceptConditions.checked;

  return (
    <form onSubmit={onSubmit}>
      <Row>
        <label>
          First Name : <input type="text" {...firstName.props} />
        </label>
      </Row>
      <Row>
        <label>
          Last Name : <input type="text" {...lastName.props} />
        </label>
      </Row>
      <Row>
        <label>
          <input type="checkbox" {...acceptConditions.props} /> Accept conditions
        </label>
      </Row>
      <Row>
        <button type="submit" disabled={!submittable}>
          Send
        </button>
      </Row>
    </form>
  );
}

function Row({ children }) {
  return <p className="row">{children}</p>;
}

Row.propTypes = {
  children: PropTypes.node
};

function useFormInput(name, defaultValue = "") {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);

  const onChange = event => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    if (!touched) {
      setTouched(true);
    }
  };

  return {
    value,
    hasValue: !!value,
    touched,
    props: {
      name,
      value,
      onChange,
      onBlur
    }
  };
}

function useCheckbox(name, defaultChecked = false) {
  const [checked, setChecked] = useState(defaultChecked);
  const [touched, setTouched] = useState(false);

  const onChange = event => setChecked(event.target.checked);

  const onBlur = () => {
    if (!touched) {
      setTouched(true);
    }
  };

  return {
    checked,
    touched,
    props: {
      name,
      checked,
      onChange,
      onBlur
    }
  };
}
