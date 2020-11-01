import { PureComponent } from "react";

import Menu from "./Menu";

export default {
  title: "Menu",
  component: Menu,
};

export const main = () => {
  return <MenuDemo />;
};

class MenuDemo extends PureComponent {
  state = {
    selectedItemKey: 0,
  };

  onClick = (selectedItemKey) => (event) => {
    event.preventDefault();
    this.setState({ selectedItemKey });
  };

  render() {
    const { selectedItemKey } = this.state;

    const items = [
      {
        key: 0,
        content: "Mes cartes enregistrées",
        onClick: this.onClick(0),
      },
      {
        key: 1,
        content: "Carte de paiement",
        onClick: this.onClick(1),
      },
      {
        key: 2,
        content: "Paypal",
        onClick: this.onClick(2),
      },
      {
        key: 3,
        content: "Apple Pay",
        onClick: this.onClick(3),
      },
    ];
    return <Menu items={items} selectedItemKey={selectedItemKey} />;
  }
}
