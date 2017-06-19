// router tells express what this request must go
var express = require('express');
var router = express.Router();
var ctrlLocation = require('../controllers/location');
var ctrlOther = require('../controllers/other');

/* location pages */
router.get('/', ctrlLocation.homelist);
router.get('/location', ctrlLocation.location);
router.get('/location/review/new', ctrlLocation.addreview);

/* Other pages */
router.get('/about', ctrlOther.about);

module.exports = router;
