import { compassSectors } from '@/const'

/**
 * @param {string} str
 * @return {string}
 */
export const capitalizeFirstLetter = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

/**
 * @param {number} degree
 */
export const getWindDirectionText = (degree) => {
    return compassSectors[(degree / 22.5).toFixed(0)]
}
