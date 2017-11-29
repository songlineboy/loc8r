// router tells express what this request must go
var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');

/* location api routes */
router.get('/locations', ctrlLocations.locationReadAll);
router.get('/locations/:locationid', ctrlLocations.locationRead);
router.post('/locations', ctrlLocations.locationCreate);
router.put('/locations/:locationid', ctrlLocations.locationUpdate);
router.delete('/locations/:locationid', ctrlLocations.locationRemove);

module.exports = router;
