import Vue from 'vue'
import Vuex from 'vuex'
import { currentWeatherRequest } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /** @type {Array<WeatherOneLocation>} | null */
        citiesWeather: null
    },
    mutations: {
        SET_CITIES_WEATHER(state, citiesWeather) {
            state.citiesWeather = citiesWeather
        },
        ADD_CITY_WEATHER(state, cityWeather) {
            state.citiesWeather.push(cityWeather)
        },
        REMOVE_CITY_WEATHER(state, cityWeatherId) {
            state.citiesWeather = state.citiesWeather.filter(
                (item) => item.id !== cityWeatherId
            )
        }
    },
    actions: {
        async init({ commit }) {
            const citiesWeather = await currentWeatherRequest.listByCityIds({
                ids: [2216885, 2212771, 2563191, 2210247, 2215163, 2219905]
            })
            commit('SET_CITIES_WEATHER', citiesWeather.list)
        }
    },
    modules: {}
})
