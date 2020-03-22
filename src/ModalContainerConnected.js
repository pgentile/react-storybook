import { connect } from "react-redux";

import ModalContainer from "./ModalContainer";
import { selectCurrentModal, hideModal } from "./redux/reducers/modals";

const mapStateToProps = (state) => ({
  currentModal: selectCurrentModal(state),
});

const mapDispatchToProps = {
  onClose: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
