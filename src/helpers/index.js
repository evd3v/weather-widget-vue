import { compassSectors } from '@/const'

/**
 * Returns string with capitalized first character
 * @param {string} str - Initial string
 * @return {string}
 */
export const capitalizeFirstLetter = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

/**
 * Returns direction shortcut name by degree
 * @param {number} degree
 */
export const getWindDirectionText = (degree) => {
    return compassSectors[(degree / 22.5).toFixed(0)]
}
