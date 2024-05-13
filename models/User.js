const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    sales: Array,
    weeklyGoal: {type: Number, required: true}
})

const User = model('user', userSchema)

module.exports = User;