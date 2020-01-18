const express = require('express')
const dataRouter = express.Router()
const Data = require("../models/data")



dataRouter.post('/', (req, res, next) => {      
    const newData = new Data(req.body)
    newData.save((err,data) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send('data saved')
    })
})


dataRouter.get('/', (req, res, next) => {    
    Data.find((err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)
    })
})


dataRouter.delete('/', (req, res, next) => {
    Data.deleteMany((err, data) => {      
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send('all data was deleted!')
    })
})


module.exports = dataRouter