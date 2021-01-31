import OpenWeatherApi from '@/api/openWeatherApi/index'
import qs from 'qs'

const SINGLE_WEATHER_ENDPOINT = '/weather'

export default class CurrentWeatherRequest extends OpenWeatherApi {
    constructor() {
        super()
    }

    /**
     * Returns the weather object by city id
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
     * Returns the weather object by city name
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
