import { createVuetify } from "vuetify";
import "vuetify/styles";

export const vuetify = createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "hsl(358, 54%, 48%)",
        },
      },
    },
  },
});
