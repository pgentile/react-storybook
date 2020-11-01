import { PureComponent } from "react";
import PropTypes from "prop-types";

import Card from "../Card";
import Button from "../buttons/Button";
import VoucherForm from "./VoucherForm";

import "./VoucherContainer.scss";

export default class VoucherContainer extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onAddVoucher: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: "",
  };

  state = {
    currentState: "QUESTION",
  };

  onShowForm = () => {
    this.setState({
      currentState: "FORM",
    });
  };

  onHideForm = () => {
    this.setState({
      currentState: "QUESTION",
    });
  };

  render() {
    const { className, onAddVoucher } = this.props;
    const { currentState } = this.state;

    const showQuestion = currentState === "QUESTION";
    const showForm = currentState === "FORM";

    return (
      <Card as="section" layer="flat" className={`voucher-container ${className}`}>
        {showQuestion && (
          <Button className="voucher-container__question" flat onClick={this.onShowForm}>
            Avez-vous un code promo&nbsp;?
          </Button>
        )}

        {showForm && (
          <VoucherForm className="voucher-container__form" onAddVoucher={onAddVoucher} onCancel={this.onHideForm} />
        )}
      </Card>
    );
  }
}
