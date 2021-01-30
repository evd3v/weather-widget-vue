<template>
    <div class="city-card">
        <div class="city-name">
            <span> {{ cityWeather.name }}, </span>
            <span>{{ cityWeather.sys.country }}</span>
        </div>
        <div class="weather">
            <img class="weather-icon" :src="iconURL" />
            <span class="weather-degrees">
                {{ cityWeather.main.temp.toFixed(0) }}&deg;C
            </span>
        </div>
        <div class="description">
            {{ description }}
        </div>
        <div class="parameters">
            <div class="left-side">
                <div class="parameters-item wind">
                    <span
                        class="wind-direction-icon"
                        :style="windDirectionRotateStyle"
                    >
                        <direction-solid-icon />
                    </span>
                    <span class="wind-speed">
                        {{ cityWeather.wind.speed.toFixed(1) }}m/s
                    </span>
                    <span class="wind-direction-description">
                        {{ windDirection }}</span
                    >
                </div>
                <div class="parameters-item humidity">
                    Humidity: {{ cityWeather.main.humidity }} %
                </div>
            </div>
            <div class="right-side">
                <div class="parameters-item pressure">
                    <span>Pressure: {{ cityWeather.main.pressure }}hPa</span>
                </div>
                <div class="parameters-item visibility">
                    Visibility:
                    {{ (cityWeather.visibility / 1000).toFixed(1) }} km
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { capitalizeFirstLetter, getWindDirectionText } from '@/helpers'

import DirectionSolidIcon from '@/assets/images/svg/direction-solid.svg?inline'

export default {
    name: 'CityCard',
    components: {
        DirectionSolidIcon
    },
    props: {
        /** @type {WeatherOneLocation} */
        cityWeather: {
            type: Object,
            required: true
        }
    },
    computed: {
        iconURL() {
            return `${this.iconBaseURL}${this.cityWeather.weather[0].icon}@2x.png`
        },
        description() {
            const feelsLikeTemp = this.cityWeather.main.feels_like.toFixed(0)
            const description = capitalizeFirstLetter(
                this.cityWeather.weather[0].description
            )

            return `Feels like ${feelsLikeTemp} °C. ${description}`
        },
        windDirection() {
            return getWindDirectionText(this.cityWeather.wind.deg)
        },
        windDirectionRotateStyle() {
            return `transform: rotate(${this.cityWeather.wind.deg}deg)`
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
    margin-bottom: 30px;
    user-select: none;
    .city-name {
        font-size: 14px;
        font-weight: 600;
    }

    .weather {
        display: flex;
        align-items: center;
        justify-content: center;
        &-icon {
            height: 100px;
            width: 100px;
        }
        &-degrees {
            font-size: 26px;
            font-weight: 700;
        }
    }

    .description {
        font-size: 12px;
    }

    .parameters {
        display: flex;
        justify-content: space-between;
        .left-side {
            margin-right: 15px;
        }
        &-item {
            margin-top: 10px;
            position: relative;
            display: flex;
            align-items: center;
            font-size: 10px;
        }
    }

    .wind {
        &-direction-icon {
            position: absolute;
            width: 23px;
            height: 23px;
            transition: ease-in-out 0.2s;
        }

        &-speed {
            margin-left: 30px;
        }
        &-direction-description {
            margin-left: 10px;
        }
    }
}
</style>
