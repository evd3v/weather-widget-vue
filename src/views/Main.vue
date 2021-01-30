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

import { mapActions, mapState } from 'vuex'

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
        await this.init()
        this.fetching = false
        // setTimeout(() => {
        //     this.fetching = false
        // }, 2000)
    }
}
</script>

<style lang="scss" scoped>
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

.widget-wrapper {
    position: fixed;
    bottom: 30px;
    right: 30px;
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
