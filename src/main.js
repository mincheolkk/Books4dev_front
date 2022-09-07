import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import { router } from './router.js'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueMq from "vue-mq";


Vue.use(Vuetify);

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity
  }
});

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')
