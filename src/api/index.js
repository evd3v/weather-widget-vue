import currentWeather from '@/api/openWeatherApi/currentWeatherRequest'

/** Single tone instance for making requests to current weather OpenWeather API */
export const currentWeatherRequest = new currentWeather()
