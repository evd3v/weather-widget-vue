import Vue from 'vue'
import Vuex from 'vuex'
import { currentWeatherRequest } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /** @type WeatherMultipleLocations | null */
        citiesWeather: null
    },
    mutations: {
        SET_CITIES_WEATHER(state, citiesWeather) {
            state.citiesWeather = citiesWeather
        }
    },
    actions: {
        async init({ commit }) {
            const citiesWeather = await currentWeatherRequest.listByCityIds({
                ids: [2216885, 2212771]
            })
            commit('SET_CITIES_WEATHER', citiesWeather)
        }
    },
    modules: {}
})
