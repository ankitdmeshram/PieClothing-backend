const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
       
        ref: "User",
    },

    street: {
        type: String,
    },
    landmark: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pin: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },

});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;