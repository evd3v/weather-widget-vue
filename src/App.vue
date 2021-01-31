<template>
    <div id="app" class="weather-widget">
        <router-view />
    </div>
</template>

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
</style>
