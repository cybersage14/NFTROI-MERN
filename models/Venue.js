const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
    },
    link: {
        type: String,
    },
    image: {
        type: String,
    },
    description:{
        type:String
    }
});

module.exports = mongoose.model('venue', VenueSchema);
