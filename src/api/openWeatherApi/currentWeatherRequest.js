import OpenWeatherApi from '@/api/openWeatherApi/index'
import qs from 'qs'

/** url inside OpenWeather API for getting only one CityWeather */
const SINGLE_WEATHER_ENDPOINT = '/weather'

export default class CurrentWeatherRequest extends OpenWeatherApi {
    constructor() {
        super()
    }

    /**
     * Returns the CityWeather object by city id
     * @param {number} id - The city id
     * @return {Promise<WeatherOneLocation>}
     */
    async getByCityId({ id }) {
        const { data } = await this.client.get(SINGLE_WEATHER_ENDPOINT, {
            params: {
                id
            }
        })
        return data
    }

    /**
     * Returns the CityWeather object by city name
     * @param {string} q - The search by city name parameter
     * @return {Promise<WeatherOneLocation>}
     */
    async getByCityName({ q }) {
        const { data } = await this.client.get(SINGLE_WEATHER_ENDPOINT, {
            params: {
                q
            }
        })
        return data
    }

    /**
     * Returns list of CitiesWeather objects by list of city ids
     * @param {Array<number>} ids - City ids
     * @return {Promise<WeatherMultipleLocations>}
     */
    async listByCityIds({ ids }) {
        const { data } = await this.client.get('/group', {
            params: {
                id: ids
            },
            paramsSerializer: (params) =>
                qs.stringify(params, { arrayFormat: 'comma' })
        })

        return data
    }

    /**
     * Returns the CityWeather object by coordinates
     * @param {number} lat - latitude coordinate
     * @param {number} lon - longitude coordinate
     * @return {Promise<WeatherMultipleLocations>}
     */
    async getByCoordinates(lat, lon) {
        const { data } = await this.client.get('/weather', {
            params: {
                lat,
                lon
            }
        })
        return data
    }
}
