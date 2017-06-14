/* location controller */

/* a bunch of functions to handle most things */

module.exports.homelist = function(req,res){
	res.render('list', {title:'List of Locations'});
};

module.exports.location = function(req,res){
	res.render('location', {title:'Location'});
};

module.exports.addreview = function(req,res){
	res.render('addreview', {title:'Add location Review'});
};
