import ButtonGroup, { ButtonInGroup } from "./ButtonGroup";

export default {
  title: "Buttons / ButtonGroup",
  component: ButtonGroup,
};

export const main = () => {
  return (
    <ButtonGroup>
      <ButtonInGroup>Button 1</ButtonInGroup>
      <ButtonInGroup>Button 2</ButtonInGroup>
      <ButtonInGroup>Button 3</ButtonInGroup>
      <ButtonInGroup>Button 4</ButtonInGroup>
    </ButtonGroup>
  );
};

export const large = () => {
  return (
    <ButtonGroup>
      <ButtonInGroup size="large">Button 1</ButtonInGroup>
      <ButtonInGroup size="large">Button 2</ButtonInGroup>
      <ButtonInGroup size="large" toggled>
        Button 3
      </ButtonInGroup>
      <ButtonInGroup size="large">Button 4</ButtonInGroup>
    </ButtonGroup>
  );
};
