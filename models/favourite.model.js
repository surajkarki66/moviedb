const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId : {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime : {
        type: String
    }

}, { timestamps: true })


const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = { Favourite }
