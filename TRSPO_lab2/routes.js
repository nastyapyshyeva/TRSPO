var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var controllers = require('./controllers/handlers');
router.use(bodyParser.json() );
router.use(bodyParser.urlencoded({
  extended: true
})); 


router.get('/rockstars', controllers.getAll);
router.get('/rockstar/:id', controllers.getOne);
router.post('/rockstar', controllers.post);
router.put('/rockstar/:id', controllers.put);
router.delete('/rockstar/:id', controllers.delete);

module.exports = router;