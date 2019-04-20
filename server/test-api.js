//const axios = require('axios')


const testApi = async () => {
   await axios.get("http://localhost:7000/bookshelf/")
    .then(resp => console.log(resp.data.books))
    .catch(error => console.log(error))
   await axios.get("http://localhost:7000/books/search/computer")
    .then(resp => console.log(resp))
    .catch(error => console.log(error))
}

testApi()

//module.exports = testApi
