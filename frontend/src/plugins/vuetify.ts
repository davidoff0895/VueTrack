import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#008eff',
          background: '#23272b',
          secondary: '#80929d',
          surface: '#111314',
        },
      },
      light: {
        colors: {
          primary: '#008eff',
          error: '#c22731',
        },
      },
    },
  },
});
