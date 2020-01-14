const express = require('express')
const dataRouter = express.Router()
const Data = require("../models/data")



dataRouter.post('/', (req, res, next) => {      // regular post request without checking anything in the database
    const newData = new Data(req.body)
    newData.save((err,data) => {
        if (err) {
            res.status(400)
            return next(err)
        }
        return res.status(201).send('data saved')
    })
})


dataRouter.get('/', (req, res, next) => {    
    Data.find((err, data) => {
        if(err) {
            res.status(400)
            return next(err)
        }
        return res.status(200).send(data)
    })
})

dataRouter.delete('/', (req, res, next) => {
    Data.remove((err, data) => {      // for postman testing, deletes everything !
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send('all data was deleted!')
    })
})


module.exports = dataRouter