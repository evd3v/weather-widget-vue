import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import { currentWeatherRequest } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /** @type {Array<WeatherOneLocation>} | null */
        citiesWeather: null,
        /** @type {Array<number>} */
        citiesWeatherIds: []
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
        async init({ state, commit }) {
            const citiesWeather = await currentWeatherRequest.listByCityIds({
                ids: [state.citiesWeatherIds]
            })
            commit('SET_CITIES_WEATHER', citiesWeather.list)
        }
    },
    modules: {},
    plugins: [
        new VuexPersistence({
            reducer: (state) => ({
                citiesWeatherIds: state.citiesWeather.map(
                    (cityWeather) => cityWeather.id
                )
            })
        }).plugin
    ]
})
