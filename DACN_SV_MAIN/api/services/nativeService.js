module.exports = {

    query: (aggregate) => {
        return new Promise((resolve, reject) => {
            // console.log(sails.getDatastore().manager.collection('OrderItem'))
            sails.getDatastore().manager.collection('orderitem')
                .aggregate(aggregate)
                .toArray((err, results) => {
                    if (err) {
                        console.log(err)
                        return reject(err);
                        // handle error 2
                    }
                    console.log(results)
                    return resolve(results);
                    // Do something with your results
                });
        })
    },
    search: (aggregate) => {
        return new Promise((resolve, reject) => {
            // console.log(sails.getDatastore().manager.collection('OrderItem'))
            sails.getDatastore().manager.collection('product')
                .aggregate(aggregate)
                .toArray((err, results) => {
                    if (err) {
                        console.log(err)
                        return reject(err);
                        // handle error 2
                    }
                    console.log(results)
                    return resolve(results);
                    // Do something with your results
                });
        })
    }
}