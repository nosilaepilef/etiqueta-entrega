const axios = require("axios")

const api = axios.create({
  baseURL: "https://shippging-label.herokuapp.com/"
})



module.exports = api