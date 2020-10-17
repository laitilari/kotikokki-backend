const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    imageUrl:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    availability:{
        type: Date,
        required: true
    }
})

const Dish = mongoose.model("Dish", dishSchema);
module.exports = Dish;