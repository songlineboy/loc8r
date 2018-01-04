// router tells express what this request must go
var express = require('express');
var router = express.Router();
var ctrlLocation = require('../controllers/location');
var ctrlOther = require('../controllers/other');

/* location pages */
router.get('/', ctrlLocation.homelist);
router.get('/location', ctrlLocation.location);
router.get('/location/:locationid', ctrlLocation.location);
router.get('/location/:locationid/review/new', ctrlLocation.addreview);
router.post('/location/:locationid/review/new', ctrlLocation.savereview);

/* Other pages */
router.get('/about', ctrlOther.about);

module.exports = router;
