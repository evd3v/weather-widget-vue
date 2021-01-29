import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vueCustomElement from 'vue-custom-element'
import '@ungap/custom-elements'

Vue.use(vueCustomElement)

App.store = store
App.router = router
Vue.customElement('weather-widget', App)
