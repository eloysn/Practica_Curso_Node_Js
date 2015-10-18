"use strict";



var express = require('express');
var router = express.Router();
var fs = require('fs');
let f = 'ssss';

/* GET home page. */
router.get('/', function(req, res, next) {

  fs.readFile(__dirname + '/../README.md', {encoding: 'utf8'}, (err, data)=> {
    if (err) {
      console.log(err);
      return next(new Error(`Can't read README.md file`));
    }

    res.render('index', { title: 'NodePop', readme: data });

  });



});

module.exports = router;
