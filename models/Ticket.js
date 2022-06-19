const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new mongoose.Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        default: Date.now
    },
    to: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('ticket', TicketSchema);
