<template>
    <button class="base-button" @click="onClick">
        <span>
            {{ label }}
        </span>
    </button>
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    methods: {
        onClick() {
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss" scoped>
.base-button {
    position: relative;
    font-family: inherit;
    border: 1px solid #447ba4;
    line-height: 30px;
    height: 30px;
    font-size: 14px;
    color: #fff;
    background: #447ba4;
    border-radius: 5px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    &:hover {
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
}
</style>
