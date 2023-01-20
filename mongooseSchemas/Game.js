const mongoose = require('mongoose')


const Game = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type: String,
        required: [true,'Пожалуйста, заполните название игры'],
    },
    descr: {
        type: String,
    },
    score: {
        type: Number,
        required: [true, 'Пожалуйста, оцените игру'],
        max: [10,'Максимальная оценка - 10'],
        min: [0,'Максимальная оценка - 0']
    },
    date: {
        type: String,
        required: true
    }
})





module.exports = mongoose.model('Game',Game)

