googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBlvLPHX7SNJcsea6P8DdJCDbQyE1Q-h_U',
    Promise: Promise
});
module.exports = {
    googleMapsClient: googleMapsClient,
    directions: (request) => {
        return new Promise((resolve, reject) => {
            googleMapsClient.directions(request)
                .asPromise()
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    return reject(err);
                });
        })
    }
}
