<template>
    <div class="city-card">
        <div class="city-name">
            <span> {{ cityWeather.name }}, </span>
            <span>{{ cityWeather.sys.country }}</span>
        </div>
        <div class="weather">
            <img class="weather-icon" :src="weatherIconURL" />
            <span class="weather-degrees">
                {{ cityWeather.main.temp.toFixed(0) }} &deg;C
            </span>
        </div>
        <div class="description">
            {{ weatherDescription }}
        </div>
    </div>
</template>

<script>
import { capitalizeFirstLetter } from '@/helpers'

export default {
    name: 'CityCard',
    props: {
        /** @type {WeatherOneLocation} */
        cityWeather: {
            type: Object,
            required: true
        }
    },
    computed: {
        weatherIconURL() {
            return `${this.iconBaseURL}${this.cityWeather.weather[0].icon}@2x.png`
        },
        weatherDescription() {
            const feelsLikeTemp = this.cityWeather.main.feels_like.toFixed(0)
            const description = capitalizeFirstLetter(
                this.cityWeather.weather[0].description
            )

            return `Feels like ${feelsLikeTemp} °C. ${description}`
        }
    },
    data() {
        return {
            iconBaseURL: 'https://openweathermap.org/img/wn/'
        }
    }
}
</script>

<style lang="scss" scoped>
.city-card {
    padding: 20px;
    .city-name {
        font-size: 14px;
    }

    .weather {
        display: flex;
        align-items: center;
        &-icon {
            height: 100px;
            width: 100px;
        }
        &-degrees {
            font-size: 20px;
        }
    }
}
</style>
