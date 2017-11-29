// router tells express what this request must go
var express = require('express');
var router = express.Router();
var ctrlReviews = require('../controllers/reviews');

/* review api routes */
router.get('/locations/reviews', ctrlReviews.locationReadAll);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.locationRead);
router.post('/locations/:locationid/reviews/:reviewid', ctrlReviews.locationCreate);
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.locationUpdate);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.locationRemove);

module.exports = router;
