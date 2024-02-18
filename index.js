/* const express = require("express")
const { incr } = require('./limiters')
 */

import express  from "express"
import redis from './init_redis.js'
const app = express()
import {incr,expire} from './limiters.js'
const port = 3003

await redis.connect()


app.get('/', (req, res) => {
    res.send('success')
})

app.get('/api', async (req, res) => {
    try {
        // get iP
        const getIPUser = req.headers['x-forwarded-for'] || req.connection.remoteAddress

        console.log(getIPUser)
        
        const numRequest = await incr(getIPUser)
        if(numRequest === 1){
            await expire(getIPUser,10)

        }else{
            console.log('bun')
            
        }
        if(numRequest > 10){
           return res.status(401).send('so much request')
        }

        res.json({
            status:'success',
            numRequest
        })
      
    } catch (error) {
        throw new Error(error)
    }
    // res.send('success')
})
app.listen(port, () => { console.log(`listen in ${port}`) })