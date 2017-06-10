/* main controller */

/* a bunch of functions to handle most things */

/* get home page */
module.exports.index = function(req,res){
	res.render('index', {title:'Express App'});
};

/* get simon page */
module.exports.simon = function(req,res){
	res.render('simon', {title:'Express App',cabbages:'Sweet Cheeks'});
};
