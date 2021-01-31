import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCustomElement from 'vue-custom-element'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import '@ungap/custom-elements'
import 'swiper/css/swiper.css'

Vue.use(VueCustomElement)
Vue.use(VueAwesomeSwiper)

App.store = store
App.router = router

Vue.customElement('weather-widget', App)
