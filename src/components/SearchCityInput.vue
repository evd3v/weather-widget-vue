<template>
    <div class="search-city-input">
        <div class="search-city-input-label">{{ label }}</div>
        <div class="search-city-input-field">
            <input
                v-model="searchString"
                type="text"
                @keydown.enter="searchHandler"
            />
            <arrow-return-left-solid-icon @click="searchHandler" />
        </div>
    </div>
</template>

<script>
import ArrowReturnLeftSolidIcon from '@/assets/images/svg/arrow-return-left-solid.svg?inline'

export default {
    name: 'SearchCityInput',
    components: {
        ArrowReturnLeftSolidIcon
    },
    props: {
        value: {
            type: String,
            required: true
        },
        label: {
            type: String,
            default: ''
        },
        searchFunction: {
            type: Function,
            required: true
        },
        searchField: {
            type: String,
            required: true
        }
    },
    computed: {
        searchString: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        async searchHandler() {
            if (this.searchString) {
                try {
                    const result = await this.searchFunction({
                        [this.searchField]: this.searchString
                    })
                    this.$emit('success', result)
                    this.searchString = ''
                } catch (e) {
                    this.$emit('error', e.response.data.message)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.search-city-input {
    margin-bottom: 5px;
    &-label {
        font-size: 14px;
    }
    &-field {
        margin-top: 5px;
        display: flex;
        align-items: center;
        input {
            margin-right: 10px;
            flex: 1;
            height: 30px;
            padding: 0 10px;
            font-size: 16px;
            border: 1px solid var(--weather-widget-dark-grayish-blue);

            &:focus {
                outline: none;
            }
        }
        svg {
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
