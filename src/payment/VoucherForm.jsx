import React from "react";
import PropTypes from "prop-types";
import { Form, useField } from "react-final-form";
import createDecorator from "final-form-focus";

import InputField from "../forms/InputField";
import FinalButton from "../ff/FinalButton";
import FinalFieldContainer from "../ff/FinalFieldContainer";
import FinalProgressButton from "../ff/FinalProgressButton";

import "./VoucherForm.scss";

const focusOnErrors = createDecorator();

export default function VoucherForm({ code, className, onAddVoucher, onCancel }) {
  const onFormSubmit = async (values) => {
    try {
      await onAddVoucher(values.code);
    } catch (e) {
      return {
        code: "Nous n'avons pas réussi à prendre en compte votre code promo",
      };
    }
  };

  return (
    <Form
      onSubmit={onFormSubmit}
      decorators={[focusOnErrors]}
      initialValues={{ code }}
      render={({ handleSubmit }) => (
        <VoucherFormInternal handleSubmit={handleSubmit} onCancel={onCancel} className={className} />
      )}
    />
  );
}

VoucherForm.propTypes = {
  code: PropTypes.string,
  className: PropTypes.string,
  onAddVoucher: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

function VoucherFormInternal({ handleSubmit, className = "", onCancel }) {
  useField("code", {
    subscription: {},
    validate: (value) => {
      if (!value) {
        return "Vous n'avez pas renseigné votre code";
      }
      if (value.length < 6) {
        return "Votre code est trop court";
      }
    },
  });

  return (
    <form className={`voucher-form ${className}`} onSubmit={handleSubmit}>
      <div className="voucher-form__line">
        <FinalFieldContainer name="code" label="Code promo">
          {(fieldProps) => <InputField {...fieldProps} autoComplete="off" spellCheck={false} maxLength={16} />}
        </FinalFieldContainer>
      </div>
      <div className="voucher-form__line">
        <FinalProgressButton className="voucher-form__button" type="submit" size="small">
          Ajouter le code promo
        </FinalProgressButton>
        <FinalButton className="voucher-form__button" type="reset" size="small" onClick={onCancel}>
          Annuler
        </FinalButton>
      </div>
    </form>
  );
}

VoucherFormInternal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  className: PropTypes.string,
};
