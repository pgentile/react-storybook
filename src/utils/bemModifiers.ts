export default function bemModifiers(elementOrBlockClass: string, modifiers: Modifiers): string {
  const classNames = [elementOrBlockClass];

  Object.entries(modifiers).forEach(([modifier, value]) => {
    if (value) {
      classNames.push(`${elementOrBlockClass}--${modifier}`);
    }
  });

  return classNames.join(" ");
}

export type Modifiers = {
  [modifier: string]: boolean;
};
