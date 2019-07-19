
const url = require('url');
const skmeans = require("skmeans");
module.exports = {
    //** KMEAN  */
    //Calculates unidimiensional and multidimensional k- means clustering on data.Parameters are:

    // data Unidimiensional or multidimensional array of values to be clustered.for unidimiensional data, takes the form of a simple array[1, 2, 3....., n].For multidimensional data, takes a NxM array[[1, 2], [2, 3]....[n, m]]
    // k Number of clusters
    // centroids Optional.Initial centroid values.If not provided, the algorith will try to choose an apropiate ones.Alternative values can be:
    // "kmrand" Cluster initialization will be random, but with extra checking, so there will no be two equal initial centroids.
    // "kmpp" The algorythm will use the k - means++ cluster initialization method.
    // iterations Optional.Maximum number of iterations.If not provided, it will be set to 10000.
    // distance function Optional.Custom distance function.Takes two points as arguments and returns a scalar number.
    // The function will return an object with the following data:

    // it The number of iterations performed until the algorithm has converged
    // k The cluster size
    // centroids The value for each centroid of the cluster
    // idxs The index to the centroid corresponding to each value of the data array
    // k-means with 3 clusters. Random initialization
    // var res = skmeans(data,3);

    // // k-means with 3 clusters. Initial centroids provided
    // var res = skmeans(data,3,[1,5,9]);

    // // k-means with 3 clusters. k-means++ cluster initialization
    // var res = skmeans(data,3,"kmpp");

    // // k-means with 3 clusters. Random initialization. 10 max iterations
    // var res = skmeans(data,3,null,10);

    // // k-means with 3 clusters. Custom distance function
    // var res = skmeans(data,3,null,null,(x1,x2)=>Math.abs(x1-x2));
    /**END */
    skmeans: skmeans,
    checkUrlValid: function (val) {
        if (val == null) return false
        const myURL = url.parse(val);
        if (myURL.hostname)
            return true
        return false
    },
};

