const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
    // equimentId: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     required: true,
    //     index: true
    // },
    name: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: false
    },
    serialNumber: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false,
        min: 0
    },
    imageUrl: {
        type: String,
        required: false
    },
    // category: {
    //     type: string,
    //     ref: category,
    //     require: true
    // },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

equipmentSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    } else {
        this.updatedAt = new Date();
    }
    next();
});

equipmentSchema.pre('update', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Equipment', equipmentSchema);