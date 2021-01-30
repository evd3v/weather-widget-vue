<template>
    <div class="widget-wrapper">
        <template v-if="widgetState">
            <widget
                :fetching="fetching"
                @close="toggleWidgetState"
                @settingsOpen="settingsHandler"
            />
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

export default {
    name: 'MainPage',
    components: {
        Widget,
        SunWithCloudColorIcon
    },
    data() {
        return {
            fetching: true,
            widgetState: true
        }
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
        setTimeout(() => {
            this.fetching = false
        }, 2000)
    }
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
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
