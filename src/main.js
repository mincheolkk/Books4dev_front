import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index'
import { router } from './router.js'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueMq from "vue-mq";
import InfiniteLoading from 'vue-infinite-loading';



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
Vue.config.errorHandler = function(err) {
  if (err.response && err.response.status === 429) {
    alert('너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해보세요');
  }
  if (err.response && err.response.status === 401) {
    alert('로그인이 필요합니다');
    this.$router.push('/');
  }
};

Vue.component('infinite-loading', InfiniteLoading);

new Vue({
  store,
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')
