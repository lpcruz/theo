const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);

class Yelp { 
    getBiz(searchTerm, location) {
        return new Promise((resolve, reject) => {
            client.search({
                term: searchTerm,
                location: location,
              }).then(response => {
                const biz = (response.jsonBody.businesses[0]);
                resolve(biz);
              }).catch(e => {
                reject()
              });
          })
        }
}


module.exports = Yelp;