import { connect } from 'react-redux';

import PaymentContainer from './PaymentContainer';
import { addVoucher, cancelVoucher, selectPaymentItems } from './redux/reducers/payment';


const mapStateToProps = state => ({
  items: selectPaymentItems(state),
});

const mapDispatchToProps = {
  onAddVoucher: code => addVoucher(code),
  onCancelVoucher: () => cancelVoucher(),
  onAddDonation: () => {
    return {
      type: 'NONE',
    };
  },
  onCancelDonation: () => {
    return {
      type: 'NONE',
    };
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer);
