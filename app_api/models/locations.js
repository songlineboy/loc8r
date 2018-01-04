var mongoose = require('mongoose');
// the scheme!

// propertytype can be Sring, number, date, boolean, buffer, mixed, array & objectID
// each is a path! which defines a Document.. documents are held in Collections (table)
// this is a subdocument, which is a nested scheme within locationSchema here
var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: {type: String, required: true},
    timestamp: {type: Date, "default": Date.now}
});

var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});

var locationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: String,
    rating: {type: Number, "default": 0, min: 0, max: 5},
    facilities: [String],
    // Always store coordinates longitude, latitude order.
    coords: {type: [Number], index: '2dsphere'},
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

// add this model to the db (model name, scheme head, collection name (defaults to pluralised lowercase))
mongoose.model('Location', locationSchema, 'locations');