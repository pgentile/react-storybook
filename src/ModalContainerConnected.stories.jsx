import React from "react";
import { Provider } from "react-redux";

import ModalContainerConnected from "./ModalContainerConnected";
import { createDefaultStore } from "./redux/store";
import { showModal } from "./redux/reducers/modals";

export default {
  title: "ModalContainerConnected",
  component: ModalContainerConnected,
  decorators: [
    (story) => {
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

      return <Provider store={store}>{story()}</Provider>;
    },
  ],
  parameters: {
    storyshots: false,
  },
};

export const main = () => {
  return <ModalContainerConnected />;
};
