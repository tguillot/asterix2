import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    options: {
        customProperties: true
    },
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: "03396c",
                secondary: "005b96",
                accent: "#011f4b",
                error: colors.red.darken1,
                info: "#6497b1",
                success: colors.green.darken1,
                warning: colors.orange.accent3,
            }
        }
    }
});
