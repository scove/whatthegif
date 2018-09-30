var GphApiClient = require('giphy-js-sdk-core')
client = GphApiClient("cUoIFTUc4R2X77xpQZc8AAgKLA0Uvmla")
/// Gif Search
client.random('gifs', {})
.then((response) => {
  console.log(response)
})
.catch((err) => {

})
