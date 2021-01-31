<template>
    <div class="widget">
        <div class="widget-header">
            <close-solid-icon @click="closeWidget" />
            <settings-outline-icon @click="openSettings" />
        </div>
        <div
            v-if="!fetching && citiesWeather && citiesWeather.length"
            class="widget-swiper-wrapper"
        >
            <swiper :options="swiperOptions">
                <template v-for="cityWeather in citiesWeather">
                    <swiper-slide :key="cityWeather.id">
                        <CityCard :city-weather="cityWeather" />
                    </swiper-slide>
                </template>
                <div slot="pagination" class="swiper-pagination"></div>
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
    computed: {
        ...mapState(['citiesWeather'])
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
//@import '~swiper/css/swiper.css';

.widget {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--weather-widget-dark-grayish-blue);
    border-radius: 5px;
    font-size: 14px;
    width: var(--weather-widget-width);
    height: var(--weather-widget-height);
    padding: 20px;

    &:hover {
        .widget-header {
            visibility: visible;
            opacity: 1;
        }
    }

    /** change main color for all svg icons inside widget */
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

    &-swiper-wrapper {
        .swiper-pagination::v-deep {
            bottom: 0;
            span {
                background: var(--weather-widget-main-blue);
            }
        }

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
