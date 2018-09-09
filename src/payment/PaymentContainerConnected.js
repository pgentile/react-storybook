import { connect } from "react-redux";

import PaymentContainer from "./PaymentContainer";
import {
  addVoucher,
  cancelVoucher,
  addInsurance,
  cancelInsurance,
  addDonation,
  cancelDonation,
  pay,
  selectPaymentItems,
  selectTotalAmount
} from "../redux/reducers/payment";

const mapStateToProps = state => ({
  items: selectPaymentItems(state),
  totalPrice: selectTotalAmount(state)
});

const mapDispatchToProps = {
  onAddVoucher: code => addVoucher(code),
  onCancelVoucher: () => cancelVoucher(),
  onAddInsurance: price => addInsurance(price),
  onCancelInsurance: () => cancelInsurance(),
  onAddDonation: () => addDonation("TOTO"),
  onCancelDonation: () => cancelDonation(),
  onPay: details => pay(details)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);
