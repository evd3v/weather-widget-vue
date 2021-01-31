<template>
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
        <div class="closed-widget" @click="toggleWidgetState" v-else>
            <sun-with-cloud-color-icon />
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
            widgetState: true,
            settingsState: false
        }
    },
    methods: {
        ...mapActions(['init']),
        toggleSettingsState() {
            this.settingsState = !this.settingsState
        },
        toggleWidgetState() {
            this.widgetState = !this.widgetState
        }
    },
    async mounted() {
        this.fetching = true
        await this.init().finally(() => (this.fetching = false))
    }
}
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
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

.widget-wrapper {
    position: fixed;
    bottom: 30px;
    right: 30px;
    .closed-widget {
        width: 70px;
        height: 70px;
        padding: 10px;
        border: 1px solid #447ba4;
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
