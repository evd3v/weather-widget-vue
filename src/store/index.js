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
            if (state.citiesWeather) {
                state.citiesWeather.push(cityWeather)
            } else {
                state.citiesWeather = [cityWeather]
            }
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
                ids: []
            })
            commit('SET_CITIES_WEATHER', citiesWeather.list)
        }
    },
    modules: {}
})
