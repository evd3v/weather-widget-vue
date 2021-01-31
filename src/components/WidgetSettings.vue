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
                label="Add location:"
                v-model="searchCityStr"
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
    data() {
        return {
            searchFunction: currentWeatherRequest.getByCityName.bind(
                currentWeatherRequest
            ),
            searchCityStr: '',
            error: ''
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
.custom-scrollbar {
    &::-webkit-scrollbar {
        width: 3px;
        border-radius: 100%;
    }

    &::-webkit-scrollbar-track {
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d0d0d0;
    }
}

.widget-settings {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    height: 298px;
    padding: 20px;
    width: 298px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: #fff;
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
            color: #622a20;
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
            color: #447ba4;
        }
    }

    &-search {
        margin-top: auto;
        &-error {
            position: absolute;
            font-size: 12px;
            color: #e06e1a;
        }
    }
}
</style>
