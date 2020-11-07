import { Provider } from "react-redux";

import ModalContainerConnected from "./ModalContainerConnected";
import { createDefaultStore } from "./redux/store";
import { showModal } from "./redux/reducers/modals";

export default {
  title: "ModalContainerConnected",
  component: ModalContainerConnected,
  decorators: [
    (Story) => {
      const store = createDefaultStore();

      setTimeout(() => {
        store.dispatch(showModal("expirationWarning"));
      }, 10 * 1000);

      setTimeout(() => {
        store.dispatch(showModal("expirationWarning"));
      }, 20 * 1000);

      setTimeout(() => {
        store.dispatch(showModal("expired"));
      }, 30 * 1000);

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
  parameters: {
    storyshots: false,
  },
};

export const main = () => {
  return <ModalContainerConnected />;
};
