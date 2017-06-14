// router tells express what this request must go
var express = require('express');
var router = express.Router();

var cntlLocation = require('../controllers/location');

/* location pages */
router.get('/', cntlLocation.homelist);
router.get('/location', cntlLocation.location);
router.get('/location/review/new', cntlLocation.addreview);

module.exports = router;
