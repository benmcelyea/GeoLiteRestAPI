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
  let isp = {}
  let status = {

    "cityStatus": "OK",

  }

  if (!net.isIP(ip)) {

    status.result = "BADREQUEST"
    status.code = "400"
    status.message = "Invalid IP detected"
    status.cityStatus = "BADREQUEST"


    return {
      status,
      city,

    }
  }


  if (privateIPregex.test(ip)) {

    status.result = "LOCALIP"
    status.code = "200"
    status.message = "Local IP range deteced. Maxmind does not resolve local ip address ranges "
    status.cityStatus = "LOCALIP"


    return {
      status,
      city,

    }
  }


  // Lookup ip in the city reader database
  try {

    city = cityReader.city(ip)

  } catch (AddressNotFoundError) {

    status.message = "IP not found in the GeoLite2 City database"
    status.cityStatus = "NOTFOUND"

  }


  let results = {
    status,
    city,

  }

  return (results)
}


module.exports = { lookupIp }