const express = require('express')
const app = express()
const path = require("path")
const mongoose = require('mongoose')
const PORT =  8000


app.use(express.json()) 
app.use("/data", require("./routes/data"))

app.use(express.static(path.join(__dirname, "client", "build")))




mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/fullstack', {useNewUrlParser: true}, () => {
    console.log('connect to the db captain!')    // name of database is fullstack
})
mongoose.set('useCreateIndex', true); // stops the error message...


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT} sir!`)
})