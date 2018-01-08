let request = require('request');
let apiOptions = {
    server:"http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
    apiOptions = {
        server:"http://safe-brook-82779.herokuapp.com"
    };
}

let renderHomepage = function(req,res){
    res.render('location-list',{
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
        });
};

let renderLocation = function(req,res,data){
    //if (res.post){deal with posted info};
    res.render('location-info', {
        title: data.name,
        pageHeader: {title: data.name},
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: data
    });
}

let renderReview = function(req,res,data){
    res.render('location-review-form', {
        title: 'Review ' + data.name + ' on Loc8r', 
        pageHeader: {title: 'Review ' +data.name},
        error: req.query.err,
        url: req.originalUrl
    });
}

let _showError = function (req,res, status){
  let title, content;
  if (status === 404){
     title = "404, Page Not Found";
     content = "Looks like we can't find that page.";
  } else {
     title = status + ", something's gone wrong!";
     content = "and we can't find or run that page.";
  }
  res.status(status);
  res.render('generic-text', {title:title, content:content});
}

let getLocationInfo = function(req, res, callback){
    let requestOptions, path;
    path = '/api/locations/' + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "get",
        json: {}
    };
    
    request(
        requestOptions,
        function(err, response, body){
            if (err) _showError(req,res,response.statusCode);
            let d = body;
            if (response.statusCode === 200){
                d.coords = {lng: body.coords[0],lat: body.coords[1]};
                callback(req,res,d);
            } else {
                _showError(req,res,response.statusCode);
            }
        }
    );
}

let setLocationInfo = function(req, res, callback){
    let requestOptions, path, locationid;
    locationid=req.params.locationid;
    path = '/api/locations/' + locationid + '/reviews';
    let postdata = {
        author:req.body.name,
        rating:parseInt(req.body.rating,10),
        reviewText: req.body.review
    };

    requestOptions = {
        url: apiOptions.server + path,
        method: "post",
        json: postdata
    };

    if (!postdata.author || !postdata.rating || !postdata.reviewText){
        res.redirect('/location/' + locationid + '/review/new?err=val');
    }else{
        request(
            requestOptions,
            function(err, response, body){
                if (response.statusCode === 201){
                    callback(req,res,body);
                } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                    res.redirect('/location/' + locationid + '/review/new?err=val');
                } else {
                    _showError(req,res,response.statusCode);
                }
            }
        );
    }
}

/* GET 'home' location-list.pug  page */
module.exports.homelist = function(req, res) {
    renderHomepage(req,res);
};

/* GET 'Location info' page */
module.exports.location = function(req, res) {
    getLocationInfo(req, res, function(req,res,responseData){ //note responsedata will exist when this is called! scope!
        renderLocation(req,res,responseData);
    });
};

/* GET 'Add review' page */
module.exports.addreview = function(req, res) {
    getLocationInfo(req, res, function(req,res,responseData){ //note responsedata will exist when this is called! scope!
        renderReview(req,res,responseData);
    });
};

/* POST 'Save the review */
module.exports.savereview = function(req, res) {
    setLocationInfo(req, res, function(req,res,responseData){ //note responsedata will exist when this is called! scope!
        res.redirect('/location/'+req.params.locationid);
    });
};