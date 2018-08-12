import { connect } from 'react-redux';

import PaymentContainer from './PaymentContainer';
import { addVoucher, cancelVoucher } from './redux/reducers/payment';
import { getPaymentItems } from './redux/selectors';


const mapStateToProps = state => ({
  items: getPaymentItems(state),
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
