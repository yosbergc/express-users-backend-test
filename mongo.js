const mongoose = require('mongoose')
const connectionStr = process.env.MONGO_DB_URI
mongoose.connect(connectionStr)
.then(() => {
    console.log('DB connected')
})
.catch(error => {
    console.error(error)
})