import "@storybook/addon-knobs/register";
import "@storybook/addon-actions/register";

// Ne peut pas être intégré à l'IHM storybook sans en faire un module compilé
// Ces sources ne seront pas babel-isées lors du build du storybook
// import "../src/screenshot/register";
