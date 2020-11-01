import I18nMessages from "./I18nMessages";

export default {
  title: "I18n / I18nMessages",
  component: I18nMessages,
  argTypes: {
    gender: {
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

Main.args = {
  userName: "Jean",
  tripCount: 1,
  cardCount: 1,
  gender: "male",
};
