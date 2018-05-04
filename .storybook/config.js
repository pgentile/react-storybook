import { configure, addDecorator } from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { addLocaleData } from 'react-intl';

import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';

addLocaleData(enLocaleData);
addLocaleData(frLocaleData);

setIntlConfig({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  getMessages: () => null,
});

addDecorator(withIntl);


// automatically import all files ending in *.stories.js or *.stories.jsx
const req = require.context('../src', true, /.stories.jsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
