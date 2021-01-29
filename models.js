/** @typedef {Object} WeatherOneLocation
 * @property {String} base
 * @property {WeatherClouds} clouds
 * @property {Number} cod
 * @property {WeatherCoordinates} coord
 * @property {Number} dt
 * @property {Number} id
 * @property {WeatherMainInfo} main
 * @property {String} name
 * @property {WeatherSnow} snow
 * @property {WeatherSystemInfo} sys
 * @property {Number} timezone
 * @property {Number} visibility
 * @property {Array<WeatherInfo>} weather
 * @property {WeatherWind} wind
 */

/** @typedef {Object} WeatherMultipleLocations
 * @property {Number} cnt
 * @property {Array<WeatherOneLocation>} list
 */

/** @typedef {Object} WeatherCoordinates
 * @property {Number} lat
 * @property {Number} lon
 */

/** @typedef {Object} WeatherInfo
 * @property {String} description
 * @property {String} icon
 * @property {Number} id
 * @property {String} main
 */

/** @typedef {Object} WeatherMainInfo
 * @property {Number} feels_like
 * @property {Number} grnd_level
 * @property {Number} humidity
 * @property {Number} pressure
 * @property {Number} sea_level
 * @property {Number} temp
 * @property {Number} temp_max
 * @property {Number} temp_min
 */

/** @typedef {Object} WeatherWind
 * @property {Number} deg
 * @property {Number} speed
 */

/** @typedef {Object} WeatherSnow
 * @property {Number} 1h
 */

/** @typedef {Object} WeatherClouds
 * @property {Number} all
 */

/** @typedef {Object} WeatherSystemInfo
 * @property {String} country
 * @property {Number} id
 * @property {Number} message
 * @property {Number} sunrise
 * @property {Number} sunset
 * @property {Number} type
 */
