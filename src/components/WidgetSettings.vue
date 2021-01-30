<template>
    <div class="widget-settings">
        <div class="widget-settings-header">
            <div class="widget-settings-header-title">Settings</div>
            <close-solid-icon @click="closeSettings" />
        </div>
        <div class="widget-settings-cities custom-scrollbar">
            <draggable v-model="citiesList">
                <city-settings-card
                    v-for="cityWeather in citiesList"
                    :key="cityWeather.id"
                    :city-weather="cityWeather"
                    @remove="removeHandler"
                />
            </draggable>
        </div>
        <div class="widget-settings-search">
            <search-city-input
                label="Add location:"
                :search-function="searchFunction"
                search-field="q"
                @success="searchedHandler"
            />
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
        ...mapState(['citiesWeather']),
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
            )
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
            this.ADD_CITY_WEATHER(result)
        },
        removeHandler(id) {
            this.REMOVE_CITY_WEATHER(id)
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
        //outline: 1px solid #d0d0d0;
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
    }

    &-cities {
        overflow: auto;
        height: 150px;
        margin-top: 10px;
        padding-right: 10px;
    }

    &-search {
        margin-top: auto;
    }
}
</style>
