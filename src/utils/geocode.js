const format = require('string-format')
const request = require('request')

const geocode = (address, callback) => {
    const url = format('https://api.mapbox.com/geocoding/v5/mapbox.places/{}.json?access_token=pk.eyJ1IjoieWt3eWp4bCIsImEiOiJjazVtZDVuZjYweWMzM2RsdmlmcWVuNWg4In0.9_zeIO66VfxTedVKbfWM4A&limit=1', encodeURIComponent(address))
    request({ url:url, json:true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Location is not found!', undefined)
        } else {
            const loc = {
                location: body.features[0].place_name, 
                geo: body.features[0].center.reverse()
            }
            callback(undefined, loc)
        }
    })
}

module.exports = geocode