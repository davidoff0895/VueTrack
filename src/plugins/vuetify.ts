import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#23272b',
          secondary: '#80929d',
          surface: '#23272b',
        },
      },
    }
  },
})
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
