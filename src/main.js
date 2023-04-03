import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index'
import { router } from './router.js'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify);

Vue.config.productionTip = false
Vue.config.errorHandler = function(err) {
  if (err.response && err.response.status === 429) {
    alert(err.response.data.message);
  }
  if (err.response && err.response.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push('/');
  }
};


new Vue({
  store,
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')
