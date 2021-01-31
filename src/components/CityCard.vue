<template>
    <div class="city-card">
        <div class="city-card-name">
            <span> {{ cityWeather.name }}, </span>
            <span> {{ cityWeather.sys.country }} </span>
        </div>
        <div class="city-card-weather">
            <img class="city-card-weather-icon" :src="iconURL" />
            <span class="city-card-weather-degrees">
                {{ cityWeather.main.temp.toFixed(0) }}&deg;C
            </span>
        </div>
        <div class="city-card-description">
            {{ description }}
        </div>
        <div class="city-card-parameters">
            <div class="city-card-parameters-column">
                <div
                    class="city-card-parameters-column-item city-card-parameters-column-item-wind"
                >
                    <span
                        class="city-card-parameters-column-item-wind-direction-icon"
                        :style="windDirectionRotateStyle"
                    >
                        <direction-solid-icon />
                    </span>
                    <span class="city-card-parameters-column-item-wind-speed">
                        {{ cityWeather.wind.speed.toFixed(1) }} m/s
                    </span>
                    <span
                        class="city-card-parameters-column-item-wind-direction-description"
                    >
                        {{ windDirection }}</span
                    >
                </div>
                <div class="city-card-parameters-column-item humidity">
                    Humidity: {{ cityWeather.main.humidity }} %
                </div>
            </div>
            <div class="city-card-parameters-column">
                <div class="city-card-parameters-column-item pressure">
                    <span>Pressure: {{ cityWeather.main.pressure }} hPa</span>
                </div>
                <div class="city-card-parameters-column-item visibility">
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
    data() {
        return {
            /** base URL for OpenWeather API weather images */
            iconBaseURL: 'https://openweathermap.org/img/wn/'
        }
    },
    computed: {
        iconURL() {
            /** @2x - uses for returning image with 2 times more size than original */
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
    }
}
</script>

<style lang="scss" scoped>
.city-card {
    margin-bottom: 30px;
    user-select: none;
    &-name {
        color: var(--weather-widget-very-dark-red);
        font-size: 16px;
        font-weight: 600;
    }

    &-weather {
        display: flex;
        align-items: center;
        justify-content: center;
        &-icon {
            height: 100px;
            width: 100px;
        }
        &-degrees {
            font-size: 32px;
            font-weight: 700;
            color: var(--weather-widget-main-blue);
        }
    }

    &-description {
        font-size: 14px;
    }

    &-parameters {
        display: flex;
        justify-content: space-between;
        &-column {
            &:first-child {
                margin-right: 15px;
            }

            &-item {
                margin-top: 10px;
                position: relative;
                display: flex;
                align-items: center;
                font-size: 12px;
                &-wind {
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
        }
    }
}
</style>
