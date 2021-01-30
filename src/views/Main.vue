<template>
    <div class="widget-wrapper">
        <div class="widget" v-if="widgetState">
            <div class="widget-header">
                <close-solid-icon @click="toggleWidgetState" />
                <settings-outline-icon @click="settingsHandler" />
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
        <div class="closed-widget" @click="toggleWidgetState" v-else>
            <sun-with-cloud-color-icon />
        </div>
    </div>
</template>

<script>
import SettingsOutlineIcon from '@/assets/images/svg/settings-outline.svg?inline'
import CloseSolidIcon from '@/assets/images/svg/close-solid.svg?inline'
import SunWithCloudColorIcon from '@/assets/images/svg/sun-with-cloud-color.svg?inline'

import { mapActions, mapState } from 'vuex'

import CityCard from '@/components/CityCard'

export default {
    name: 'MainPage',
    components: {
        CityCard,
        SettingsOutlineIcon,
        CloseSolidIcon,
        SunWithCloudColorIcon
    },
    data() {
        return {
            fetching: true,
            widgetState: true,
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
        toggleWidgetState() {
            this.widgetState = !this.widgetState
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
.widget-wrapper {
    position: fixed;
    bottom: 30px;
    right: 30px;
    .widget {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 14px;
        width: 250px;
        padding: 20px;

        &:hover {
            .widget-header {
                visibility: visible;
                opacity: 1;
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

        .swiper-wrapper {
            &:hover {
                cursor: pointer;
            }

            .swiper-pagination {
                bottom: 0;
            }
        }
    }
    .closed-widget {
        padding: 10px;
        border: 1px solid #75d6ff;
        border-radius: 50%;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
