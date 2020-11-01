import { Provider } from "react-redux";

import OrderEditorConnected from "./OrderEditorConnected";
import { createDefaultStore } from "../redux/store";
import { TICKET_TYPE, loadItems } from "../redux/reducers/order";

export default {
  title: "Payment / OrderEditorConnected",
  component: OrderEditorConnected,
  decorators: [
    (story) => {
      const store = createDefaultStore();

      store.dispatch(
        loadItems([
          {
            id: "billets",
            type: TICKET_TYPE,
            label: "Vos billets",
            price: {
              value: 55.6,
              currency: "EUR",
            },
          },
        ])
      );

      return <Provider store={store}>{story()}</Provider>;
    },
  ],
};

export const main = () => <OrderEditorConnected />;
