import axios from 'axios'

export const config = {
    baseURL: process.env.VUE_APP_BASE_URL
}

export default class Api {
    constructor(options = {}) {
        this.client = options.client || axios.create(config)
    }
}
