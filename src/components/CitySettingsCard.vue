<template>
    <div class="city-settings-card">
        <div class="city-settings-card-reorder">
            <burger-solid-icon />
        </div>
        <span class="city-settings-card-name">{{ cityTitle }}</span>
        <div class="city-settings-card-remove" @click="removeHandler">
            <trash-solid-icon />
        </div>
    </div>
</template>

<script>
import BurgerSolidIcon from '@/assets/images/svg/burger-solid.svg?inline'
import TrashSolidIcon from '@/assets/images/svg/trash-solid.svg?inline'

export default {
    name: 'CitySettingsCard',
    components: {
        BurgerSolidIcon,
        TrashSolidIcon
    },
    props: {
        /** @type {WeatherOneLocation} */
        cityWeather: {
            type: Object,
            required: true
        }
    },
    computed: {
        cityTitle() {
            console.log(this.cityWeather)
            return `${this.cityWeather.name}, ${this.cityWeather.sys.country}`
        }
    },
    methods: {
        removeHandler() {
            this.$emit('remove', this.cityWeather.id)
        }
    }
}
</script>

<style lang="scss" scoped>
.city-settings-card {
    display: flex;
    align-items: center;
    margin-top: 10px;
    height: 40px;
    padding: 0 20px;
    background: #ccc;
    user-select: none;
    &-reorder {
        display: flex;
        margin-right: 10px;
        align-items: center;
        &:hover {
            cursor: pointer;
        }
    }
    &-remove {
        margin-left: auto;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
