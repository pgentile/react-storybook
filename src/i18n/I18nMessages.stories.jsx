import I18nMessages from "./I18nMessages";

export default {
  title: "I18n / I18nMessages",
  component: I18nMessages,
  argTypes: {
    userName: {
      defaultValue: "Jean",
    },
    tripCount: {
      defaultValue: 1,
    },
    cardCount: {
      defaultValue: 1,
    },
    gender: {
      defaultValue: "male",
      control: {
        type: "select",
        options: ["male", "female"],
      },
    },
  },
  parameters: {
    storyshots: false,
  },
};

export const Main = (args) => <I18nMessages {...args} />;
