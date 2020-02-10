
const request = require('request')
const format = require('string-format')

const forecast = (loc, callback) => {
    const url = format('https://api.darksky.net/forecast/0cb988d46b6a47518ff3dcf3a4289d68/{},{}?units=si', ...loc)
    request({ url:url, json:true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const { currently, daily } = body
            const { temperature, precipProbability } = currently
            callback(undefined, format("{} It is currently {} degress out. The high today is {}. The low today is {}. There is a {}% chance of rain.", daily.data[0].summary, temperature, daily.data[0].temperatureHigh, daily.data[0].temperatureLow, precipProbability * 100))
        }
    })
}

module.exports = forecast