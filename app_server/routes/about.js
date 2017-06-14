// router tells express what this request must go
var express = require('express');
var router = express.Router();

var cntlOther = require('../controllers/other');

/* about page */
router.get('/', cntlOther.about);

module.exports = router;
