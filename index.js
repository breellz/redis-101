const express = require('express')
const axios = require('axios')
const redis = require('redis')

const PORT = process.env.PORT || 5000
const REDIS_PORT = process.env.PORT || 6379

const client = redis.createClient(REDIS_PORT)

const app = express()
//Make request to github for data

const getRepose = async(req, res, next) => {
    try {
        console.log('Fetching data......')

        const { username } = req.params
        const url = `https://api.github.com/users/${username}`
        const response = await axios({url});
       
        res.send(response.data)
    } catch (error) {
        res.status(500)
    }
}

app.get('/repos/:username', getRepose)

app.listen(5000, () => {
    console.log('App listening on port '+ PORT)
})