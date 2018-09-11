import { connect } from "react-redux";

import PaymentForm from "./PaymentForm";
import { selectTotalAmount } from "../redux/reducers/order";
import { pay } from "../redux/reducers/payment";
import { selectCards } from "../redux/reducers/connectedUser";

const mapStateToProps = state => ({
  registredCards: selectCards(state),
  totalPrice: selectTotalAmount(state)
});

const mapDispatchToProps = {
  onPay: details => pay(details)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm);
