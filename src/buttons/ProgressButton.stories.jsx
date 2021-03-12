import { PureComponent } from "react";

import ProgressButton from "./ProgressButton";
import sleep from "../utils/sleep";

export default {
  title: "Buttons / ProgressButton",
  component: ProgressButton,
};

export const main = () => {
  return <ProgressButtonDemo />;
};

export const loadingStory = () => {
  return <ProgressButton loading>Payer</ProgressButton>;
};

export const finishedStory = () => {
  return <ProgressButton finished>Payer</ProgressButton>;
};

export const disabledStory = () => {
  return <ProgressButton disabled>Payer</ProgressButton>;
};

class ProgressButtonDemo extends PureComponent {
  state = {
    loading: false,
    finished: false,
  };

  onClick = async () => {
    this.setState({
      loading: true,
    });

    await sleep(3000);

    this.setState({
      finished: true,
    });

    await sleep(1000);

    this.setState({
      loading: false,
      finished: false,
    });
  };

  render() {
    const { loading, finished } = this.state;

    return (
      <ProgressButton loading={loading} finished={finished} onClick={this.onClick}>
        Payer
      </ProgressButton>
    );
  }
}
