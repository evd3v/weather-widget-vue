<template>
    <div id="app" class="weather-widget">
        <div class="widget-wrapper">
            <template v-if="widgetState">
                <widget
                    :fetching="fetching"
                    @close="toggleWidgetState"
                    @settingsOpen="toggleSettingsState"
                />
                <transition name="fade">
                    <widget-settings
                        v-if="settingsState"
                        @close="toggleSettingsState"
                    />
                </transition>
            </template>
            <div
                v-else
                class="widget-wrapper-closed"
                @click="toggleWidgetState"
            >
                <sun-with-cloud-color-icon />
            </div>
        </div>
    </div>
</template>

<script>
import SunWithCloudColorIcon from '@/assets/images/svg/sun-with-cloud-color.svg?inline'

import { mapActions } from 'vuex'

import Widget from '@/components/Widget'
import WidgetSettings from '@/components/WidgetSettings'

export default {
    name: 'MainPage',
    components: {
        WidgetSettings,
        Widget,
        SunWithCloudColorIcon
    },
    data() {
        return {
            fetching: true,
            widgetState: false,
            settingsState: false
        }
    },
    async mounted() {
        this.fetching = true
        await this.init().finally(() => (this.fetching = false))
    },
    methods: {
        ...mapActions(['init']),
        toggleSettingsState() {
            this.settingsState = !this.settingsState
        },
        toggleWidgetState() {
            this.widgetState = !this.widgetState
        }
    }
}
</script>

<style lang="scss">
/** Some global css styles. It added in App.vue file, but in main.scss not because
  we need to have only one JS bundle file after build
  */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

:root {
    --weather-widget-main-blue: #447ba4;
    --weather-widget-light-gray: #f5f5f5;
    --weather-widget-very-dark-red: #622a20;
    --weather-widget-white: #ffffff;
    --weather-widget-dark-grayish-blue: #88a3b2;
    --weather-widget-vivid-orange: #e06e1a;

    --weather-widget-height: 300px;
    --weather-widget-width: 300px;
}

* {
    box-sizing: border-box;
}

.custom-scrollbar {
    &::-webkit-scrollbar {
        width: 3px;
        border-radius: 100%;
    }

    &::-webkit-scrollbar-track {
        background-color: var(--weather-widget-light-gray);
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--weather-widget-main-blue);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

@keyframes rotate {
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}

.weather-widget {
    font-family: 'Open Sans', sans-serif;
    color: #212528;
}

.widget-wrapper {
    position: fixed;
    bottom: 30px;
    right: 30px;
    &-closed {
        width: 70px;
        height: 70px;
        padding: 10px;
        border: 1px solid var(--weather-widget-main-blue);
        border-radius: 50%;

        &:hover {
            cursor: pointer;
            path:first-child {
                transform-box: fill-box;
                transform-origin: center;
                animation: rotate 8s infinite linear;
            }
        }
    }
}
</style>
