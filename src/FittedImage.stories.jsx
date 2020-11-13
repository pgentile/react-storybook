import FittedImage from "./FittedImage";

import exampleImage from "./FittedImage.example.jpg";

export default {
  title: "FittedImage",
  component: FittedImage,
  argTypes: {
    width: {
      control: {
        type: "number",
        min: 0,
        step: 1,
      },
      defaultValue: 300,
    },
  },
};

export const demo = (args) => {
  const { width } = args;
  return (
    <div style={{ width: `${width}px` }}>
      <FittedImage src={exampleImage} alt="Magnifique payage de l'île de la Réunion" />
    </div>
  );
};
