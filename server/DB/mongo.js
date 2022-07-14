const mongoose = require('mongoose')

const connectDb = () => {

    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true})
        .then((data) => console.log(`mongo db is connect on ${data.connection.host}`))
        // .catch((err) => console.log(err))

}

module.exports=connectDb