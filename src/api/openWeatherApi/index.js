import Api from '@/api/api'

const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
const OPEN_WEATHER_API_KEY = '38986857e2045a37441789aa4a9a0757'

export default class OpenWeatherApi extends Api {
    constructor() {
        super()
        this.client.defaults.baseURL = OPEN_WEATHER_API_URL

        /* add query parameter with api key to all requests */
        this.client.defaults.params = {
            appid: OPEN_WEATHER_API_KEY,
            units: 'metric'
        }
    }
}
