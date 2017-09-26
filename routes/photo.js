'use strict';

var photoCtrl = require('../controllers/photo.controller');
var express = require('express');
var router = express.Router({mergeParams: true});
var Multer = require('multer');
var multer;

//Configure multer

multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

// Create new photo.

router.post('/', multer.single('image'), photoCtrl.create);

// GET photos list or single photo by id, user id, limit, lastID parameters.

router.get('/:id?', photoCtrl.get);

// Update photo by id, user id.

router.put('/:id', photoCtrl.update);


// Delete photo by id, user id.

router.delete('/:id', photoCtrl.delete);


module.exports = router;
