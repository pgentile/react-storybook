export default function bemModifiers(elementOrBlockClass, modifiers) {
  const classNames = [elementOrBlockClass];

  Object.keys(modifiers).forEach((modifier) => {
    if (modifiers[modifier]) {
      classNames.push(`${elementOrBlockClass}--${modifier}`);
    }
  });

  return classNames.join(" ");
}
