/* reviews api controller */
var mongoose = require('mongoose');
var Loc = mongoose.model('Location')

var sendJsonRes = function(res,status,content){
    res.status(status);
    res.json({"status":content});
}

module.exports.locationReadAll = function(req, res) {
    sendJsonRes(res,200,"success");
}

module.exports.locationRead = function(req, res) {
    sendJsonRes(res,200,"success");
}

module.exports.locationCreate = function(req, res) {
    sendJsonRes(res,200,"success");
}

module.exports.locationUpdate = function(req, res) {
    sendJsonRes(res,200,"success");
}

module.exports.locationRemove = function(req, res) {
    sendJsonRes(res,200,"success");
}
