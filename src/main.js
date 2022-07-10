import Vue from 'vue'
import App from './App.vue'
import { store } from './store.js'
import { router } from './router.js'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')
