<template>
    <div class="widget">
        <div class="widget-header">
            <settings-outline-icon @click="settingsHandler" />
            <close-solid-icon @click="closeHandler" />
        </div>
        <div
            class="swiper-wrapper"
            v-if="!fetching && citiesWeather && citiesWeather.cnt"
        >
            <swiper :options="swiperOptions">
                <swiper-slide
                    v-for="cityWeather in citiesWeather.list"
                    :key="cityWeather.id"
                >
                    <CityCard :city-weather="cityWeather" />
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <template v-else>123</template>
    </div>
</template>

<script>
import SettingsOutlineIcon from '@/assets/images/svg/settings-outline.svg?inline'
import CloseSolidIcon from '@/assets/images/svg/close-solid.svg?inline'

import { mapActions, mapState } from 'vuex'

import CityCard from '@/components/CityCard'

export default {
    name: 'MainPage',
    components: { CityCard, SettingsOutlineIcon, CloseSolidIcon },
    data() {
        return {
            fetching: true,
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        }
    },
    computed: {
        ...mapState(['citiesWeather'])
    },
    methods: {
        ...mapActions(['init']),
        settingsHandler() {
            console.log('on settings')
        },
        closeHandler() {
            console.log('on close')
        }
    },
    async mounted() {
        this.fetching = true
        await this.init()
        this.fetching = false
    }
}
</script>

<style lang="scss" scoped>
.widget {
    position: fixed;
    bottom: 30px;
    right: 30px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    width: 250px;
    padding: 20px;

    /* To prevent interact.js warnings */
    user-select: none;
    -ms-touch-action: none;
    touch-action: none;

    &:hover {
        .widget-header {
            visibility: visible;
            opacity: 1;
        }
    }

    &-header {
        position: absolute;
        right: 10px;
        top: 5px;
        height: 16px;
        opacity: 0;
        visibility: hidden;
        transition: all ease-in-out 0.2s;
        svg {
            margin-right: 10px;
            &:hover {
                cursor: pointer;
            }
        }
    }

    .swiper-wrapper {
        &:hover {
            cursor: pointer;
        }

        .swiper-pagination {
            bottom: 0;
        }
    }
}
</style>
