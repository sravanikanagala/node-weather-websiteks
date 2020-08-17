const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3dlZXR5aG9uZXkyMzAxIiwiYSI6ImNrZDR0ZmcxdDAxbjIyc3F2MG8wZGQwMXAifQ.AzQDjhHxygSlYwbwWWfK7w&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }else if (body.features===undefined) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
               
            })
            { console.log(body.features[0].center[1])}
                        }
    })
}

module.exports = geocode