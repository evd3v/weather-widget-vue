<template>
    <div class="widget">
        <div class="widget-header">
            <close-solid-icon @click="closeWidget" />
            <settings-outline-icon @click="openSettings" />
        </div>
        <div
            class="swiper-wrapper"
            v-if="!fetching && citiesWeather && citiesWeather.length"
        >
            <swiper :options="swiperOptions">
                <template v-for="cityWeather in citiesWeather">
                    <swiper-slide :key="cityWeather.id">
                        <CityCard :city-weather="cityWeather" />
                    </swiper-slide>
                </template>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <template
            v-else-if="
                (!citiesWeather || (citiesWeather && !citiesWeather.length)) &&
                    !fetching
            "
        >
            <div class="widget-empty">
                <span class="widget-empty-description">
                    You haven't any configured cities yet. Do you want to add a
                    new one?
                </span>
                <base-button label="open settings" @click="openSettings" />
            </div>
        </template>
        <template v-else-if="fetching">
            <weather-preloader />
        </template>
    </div>
</template>

<script>
import SettingsOutlineIcon from '@/assets/images/svg/settings-outline.svg?inline'
import CloseSolidIcon from '@/assets/images/svg/close-solid.svg?inline'

import CityCard from '@/components/CityCard'
import { mapState } from 'vuex'
import WeatherPreloader from '@/components/WeatherPreloader'
import BaseButton from '@/components/BaseButton'

export default {
    name: 'Widget',
    components: {
        BaseButton,
        WeatherPreloader,
        CityCard,
        SettingsOutlineIcon,
        CloseSolidIcon
    },
    props: {
        fetching: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapState(['citiesWeather'])
    },
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                spaceBetween: 30
            }
        }
    },
    methods: {
        closeWidget() {
            this.$emit('close')
        },
        openSettings() {
            this.$emit('settingsOpen')
        }
    }
}
</script>

<style lang="scss" scoped>
.widget {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid #88a3b2;
    border-radius: 5px;
    font-size: 14px;
    width: 300px;
    height: 300px;
    padding: 20px;

    &:hover {
        .widget-header {
            visibility: visible;
            opacity: 1;
        }
    }

    svg {
        path {
            fill: #212528;
        }
    }

    &-header {
        position: absolute;
        right: 5px;
        top: 5px;
        height: 52px;
        opacity: 0;
        visibility: hidden;
        transition: all ease-in-out 0.2s;
        display: flex;
        flex-direction: column;
        svg {
            margin-top: 10px;
            &:hover {
                cursor: pointer;
            }
        }
    }

    &-empty {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &-description {
            text-align: center;
            margin-bottom: 10px;
        }
    }

    .swiper-wrapper {
        &:hover {
            cursor: pointer;
        }
    }
    .swiper-pagination::v-deep {
        bottom: 0;
        span {
            background: #447ba4;
        }
    }
}
</style>
