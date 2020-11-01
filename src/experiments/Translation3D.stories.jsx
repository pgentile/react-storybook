import Translation3D from "./Translation3D";

export default {
  title: "Experiments / Translation3D",
  component: Translation3D,
};

export const main = (args) => {
  return <Translation3D {...args} />;
};

main.args = {
  yTranslate: 0,
};
