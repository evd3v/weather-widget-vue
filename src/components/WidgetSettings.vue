<template>
    <div class="widget-settings">
        <div class="widget-settings-header">
            <div class="widget-settings-header-title">Settings</div>
            <close-solid-icon @click="closeSettings" />
        </div>
        <div class="widget-settings-cities custom-scrollbar">
            <template v-if="citiesList">
                <draggable v-model="citiesList">
                    <city-settings-card
                        v-for="cityWeather in citiesList"
                        :key="cityWeather.id"
                        :city-weather="cityWeather"
                        @remove="removeHandler"
                    />
                </draggable>
            </template>
            <template v-else>
                <div class="widget-settings-cities-empty">
                    it's empty here...
                </div>
            </template>
        </div>
        <div class="widget-settings-search">
            <search-city-input
                v-model="searchCityStr"
                label="Add location:"
                :search-function="searchFunction"
                search-field="q"
                @success="searchedHandler"
                @error="errorSearchHandler"
            />
            <div class="widget-settings-search-error">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script>
import Draggable from 'vuedraggable'

import CloseSolidIcon from '@/assets/images/svg/close-solid.svg?inline'
import { mapMutations, mapState } from 'vuex'
import CitySettingsCard from '@/components/CitySettingsCard'
import SearchCityInput from '@/components/SearchCityInput'
import { currentWeatherRequest } from '@/api'

export default {
    name: 'WidgetSettings',
    components: {
        SearchCityInput,
        CitySettingsCard,
        CloseSolidIcon,
        Draggable
    },
    data() {
        return {
            searchFunction: currentWeatherRequest.getByCityName.bind(
                currentWeatherRequest
            ),
            searchCityStr: '',
            error: ''
        }
    },
    computed: {
        ...mapState(['citiesWeather', 'citiesWeatherIds']),
        citiesList: {
            get() {
                return this.citiesWeather
            },
            set(value) {
                this.SET_CITIES_WEATHER(value)
            }
        }
    },
    watch: {
        searchCityStr: {
            handler() {
                this.error = ''
            }
        }
    },
    methods: {
        ...mapMutations([
            'SET_CITIES_WEATHER',
            'ADD_CITY_WEATHER',
            'REMOVE_CITY_WEATHER'
        ]),
        closeSettings() {
            this.$emit('close')
        },
        searchedHandler(result) {
            let idx = -1
            if (this.citiesWeather && this.citiesWeather.length) {
                idx = this.citiesWeather.findIndex(
                    (cityWeather) => Number(cityWeather.id) === result.id
                )
            }

            if (idx === -1) {
                this.ADD_CITY_WEATHER(result)
            } else {
                setTimeout(() => {
                    this.error = 'This city is already added'
                })
            }
        },
        removeHandler(id) {
            this.REMOVE_CITY_WEATHER(id)
        },
        errorSearchHandler(error) {
            this.error = error
        }
    }
}
</script>

<style lang="scss" scoped>
.widget-settings {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    height: calc(var(--weather-widget-height) - 2px);
    padding: 20px;
    width: calc(var(--weather-widget-width) - 2px);
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: var(--weather-widget-white);
    z-index: 1;

    &-header {
        svg {
            position: absolute;
            top: 14px;
            right: 4px;
            &:hover {
                cursor: pointer;
            }
        }

        &-title {
            color: var(--weather-widget-very-dark-red);
            font-weight: 600;
        }
    }

    &-cities {
        overflow: auto;
        height: 150px;
        margin-top: 10px;
        padding-right: 10px;

        &-empty {
            font-size: 20px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--weather-widget-main-blue);
        }
    }

    &-search {
        margin-top: auto;
        &-error {
            position: absolute;
            font-size: 12px;
            color: var(--weather-widget-vivid-orange);
        }
    }
}
</style>
