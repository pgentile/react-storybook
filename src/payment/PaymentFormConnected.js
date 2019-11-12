import { connect } from "react-redux";

import PaymentForm from "./PaymentForm";

import { selectTotalAmount } from "../redux/reducers/order";
import { pay } from "../redux/reducers/payment";
import { showModal, hideModal } from "../redux/reducers/modals";
import { selectCards } from "../redux/reducers/connectedUser";

import minDelay from "../utils/minDelay";

const mapStateToProps = state => ({
  registredCards: selectCards(state),
  totalPrice: selectTotalAmount(state)
});

const mapDispatchToProps = dispatch => {
  return {
    onPay: async details => {
      try {
        dispatch(showModal("payment"));
        return await minDelay(10 * 1000, dispatch(pay(details)));
      } finally {
        dispatch(hideModal("payment"));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
