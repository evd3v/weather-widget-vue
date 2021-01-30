<template>
    <div class="weather-preloader">
        <sun-with-cloud-color-icon />
    </div>
</template>

<script>
import SunWithCloudColorIcon from '@/assets/images/svg/sun-with-cloud-color.svg?inline'

export default {
    name: 'WeatherPreloader',
    components: { SunWithCloudColorIcon }
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}

.weather-preloader {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        transform: scale(2);
        path:first-child {
            transform-box: fill-box;
            transform-origin: center;
            animation: rotate 8s infinite linear;
        }
    }
}
</style>
