import { connect } from "react-redux";

import OrderEditor from "./OrderEditor";
import {
  addVoucher,
  cancelVoucher,
  addInsurance,
  cancelInsurance,
  addDonation,
  cancelDonation,
  selectOrderItems
} from "../redux/reducers/order";

const mapStateToProps = state => ({
  items: selectOrderItems(state)
});

const mapDispatchToProps = {
  onAddVoucher: code => addVoucher(code),
  onCancelVoucher: () => cancelVoucher(),
  onAddInsurance: price => addInsurance(price),
  onCancelInsurance: () => cancelInsurance(),
  onAddDonation: () => addDonation("TOTO"),
  onCancelDonation: () => cancelDonation()
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderEditor);
