const lookupIp = require('../resolver/ipLookup')
var express = require("express");
var router = express.Router();
const net = require('net');


//GET Request to lookup an IP address
router.get("/v1/ip/:ip", function (req, res, next) {
  const ip = req.params.ip;

  if (net.isIP(ip)) {
    results = lookupIp.lookupIp(ip)

    if (results.status.responseCode === 200) {
      res.send(lookupIp.lookupIp(ip));
    } else if (results.status.responseCode === 400) {
      res.status(400).send(results)
    }


  } else {

    res.status(400).json({
      status: {
        "responseCode": "400",
        "message": "Invalid IP address detected"
      },
    });

  }



});

router.get("/", function (req, res, next) {
  res.send("Not Supported");
});

module.exports = router;
