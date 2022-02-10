const fs = require('fs');
const Reader = require('@maxmind/geoip2-node').Reader;
const net = require('net');
const path = require('path');
const cityDBbuffer = fs.readFileSync(path.join(__dirname, "../databases", 'GeoLite2-City.mmdb'));
const cityReader = Reader.openBuffer(cityDBbuffer);


//Private IP address space regex to filter out private address ranges - Maxmind does not resolve private Ip address spaces 
const privateIPregex = new RegExp('(^127\\.)|(^10\\.)|(^172\\.1[6-9]\\.)|(^172\\.2[0-9]\\.)|(^172\\.3[0-1]\\.)|(^192\\.168\\.)')

function lookupIp(ip) {

  let city = {}
  let status = {
    responseCode: 200,
    message: "Ok"
  }

  if (!net.isIP(ip)) {

    status.responseCode = 400
    status.message = "Invalid IP detected"


    return {
      status,
      results,

    }
  }


  if (privateIPregex.test(ip)) {

    status.responseCode = 400
    status.message = "Local IP range deteced. Maxmind does not resolve local ip address ranges "



    return {
      status,
      results,

    }
  }


  // Lookup ip in the city reader database
  try {

    results = cityReader.city(ip)
    status.responseCode = 200


  } catch (AddressNotFoundError) {

    status.responseCode = 400
    status.message = "IP not found in the GeoLite2 City database"
  }

  let lookupResults = {
    status,
    results,
  }

  return (lookupResults)
}

module.exports = { lookupIp }