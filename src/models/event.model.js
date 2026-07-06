const mongoose = require('mongoose');

const TypeObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new mongoos.Schema({
    title : { type : String, required: true},
    description : { type : String },
    category : { type : String },
    
})