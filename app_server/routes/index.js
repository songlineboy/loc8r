var express = require('express');
var cntlMain = require('../controllers/main');
var router = express.Router();

/* GET home page. */
router.get('/', cntlMain.index);
module.exports = router;
