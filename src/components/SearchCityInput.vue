<template>
    <div class="search-city-input">
        <div class="search-city-input-label">{{ label }}</div>
        <div class="search-city-input-field">
            <input
                type="text"
                v-model="searchString"
                @keydown.enter="searchHandler"
                @input="inputHandler"
            />
            <arrow-return-left-solid-icon @click="searchHandler" />
        </div>
        <div class="search-city-input-error">
            {{ error }}
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
    data() {
        return {
            searchString: '',
            error: ''
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
                    this.error = e.response.data.message
                }
            }
        },
        inputHandler() {
            this.error = ''
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
            border: 1px solid #88a3b2;

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
    &-error {
        position: absolute;
        font-size: 12px;
        color: #e06e1a;
    }
}
</style>
