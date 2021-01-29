<template>
    <div class="home">
        <template v-if="!fetching && citiesWeather && citiesWeather.cnt">
            <CityCard
                v-for="cityWeather in citiesWeather.list"
                :key="cityWeather.id"
                :city-weather="cityWeather"
            />
        </template>
        <template v-else>123</template>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import CityCard from '@/components/CityCard'

export default {
    name: 'MainPage',
    components: { CityCard },
    data() {
        return {
            fetching: true
        }
    },
    computed: {
        ...mapState(['citiesWeather'])
    },
    methods: {
        ...mapActions(['init'])
    },
    async mounted() {
        this.fetching = true
        await this.init()
        this.fetching = false
    }
}
</script>

<style lang="scss" scoped>
.home {
    position: fixed;
    bottom: 30px;
    right: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    width: 200px;
}
</style>
