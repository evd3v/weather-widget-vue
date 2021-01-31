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
        <div v-else class="widget-wrapper-closed" @click="toggleWidgetState">
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

<style lang="scss" scoped>
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
