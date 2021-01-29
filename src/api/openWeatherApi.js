import qs from 'qs'
import Api from '@/api/api'

const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
const OPEN_WEATHER_API_KEY = '38986857e2045a37441789aa4a9a0757'

const WEATHER_ENDPOINT = '/weather'

export default class OpenWeatherApi extends Api {
    constructor() {
        super()
        this.client.defaults.baseURL = OPEN_WEATHER_API_URL

        /* add query parameter with api key to all requests */
        this.client.defaults.params = {
            appid: OPEN_WEATHER_API_KEY
        }
    }

    /**
     * Returns the weather object by city id
     * @param {number} id - The city id
     * @return {Promise<WeatherOneLocation>}
     */
    async getCurrentWeatherByCityId({ id }) {
        const { data } = await this.client.get(WEATHER_ENDPOINT, {
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
    async getCurrentWeatherByCityName({ q }) {
        const { data } = await this.client.get(WEATHER_ENDPOINT, {
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
    async getMultipleCitiesCurrentWeatherByCityIds({ ids }) {
        const { data } = await this.client.get('/group', {
            params: {
                id: ids
            },
            paramsSerializer: (params) =>
                qs.stringify(params, { arrayFormat: 'comma' })
        })

        return data
    }
}
