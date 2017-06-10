var express = require('express');
var cntlMain = require('../controllers/main');
var router = express.Router();

/* GET simon page. */
router.get('/', cntlMain.simon);
module.exports = router;
