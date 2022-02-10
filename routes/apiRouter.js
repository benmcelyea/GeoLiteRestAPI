const lookupIp = require('../resolver/ipLookup')
var express = require("express");
var router = express.Router();
const net = require('net');


/* GET home page. */
router.get("/v1/ip/:ip", function (req, res, next) {
  const ip = req.params.ip;

  if (net.isIP(ip)) {

    res.send(lookupIp.lookupIp(ip));
  } else {

    res.status(400).json({ error: 'Invalid IP address' });

  }



});

router.get("/", function (req, res, next) {
  res.send("Not Supported");
});

module.exports = router;
