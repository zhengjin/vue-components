import Vue from 'vue'
import App from './play/index'

import {router} from './play/router'

// import 'packages/theme-chalk/src/index.scss'
// Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
