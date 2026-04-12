const mongoose = require('mongoose')

const DBConnection = async() => {
    try{
        await mongoose.connect(process.env.Mongo_Url)
        console.log('Database connected')
    }catch(err){
        console.log(err)
    }
}

module.exports = DBConnection