export default function bemModifiers(elementOrBlockClass: string, modifiers: Modifiers): string;

type Modifiers = {
  [modifier: string]: boolean;
};
