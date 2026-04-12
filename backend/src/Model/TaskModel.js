const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title : String,
    description : String,
    status : {
        type : String,
        enum : ['pending', 'completed', 'rejected'],
        default : 'pending'
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

module.exports = mongoose.model('Task', taskSchema)