# GeoLiteRestAPI
A simple API to resolve IP addresses using the GeoLite2 City database. IPV4 and IPV6 compativble. 

## Installation
- Clone the repo
- Install the dependencies ```npm -i ```
- Download the Geolite city database from [Maxmind](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data)
- Copy the City database to the /databases folder 
- Run the server - ```npm run start```

## API endpoint: 
/api/v1/ip/:ipaddress

### Example request: 
[http://localhost:3000/api/v1/ip/185.199.108.0](http://localhost:3000/api/v1/ip/185.199.108.0)

#### Example Success response:
```
{
  "status": {
    "responseCode": "200",
    "message": "Ok"
  },
  "results": {
    "continent": {
      "code": "NA",
      "geonameId": 6255149,
      "names": {
        "de": "Nordamerika",
        "en": "North America",
        "es": "Norteamérica",
        "fr": "Amérique du Nord",
        "ja": "北アメリカ",
        "pt-BR": "América do Norte",
        "ru": "Северная Америка",
        "zh-CN": "北美洲"
      }
    },
    "country": {
      "geonameId": 6252001,
      "isoCode": "US",
      "names": {
        "de": "Vereinigte Staaten",
        "en": "United States",
        "es": "Estados Unidos",
        "fr": "États Unis",
        "ja": "アメリカ",
        "pt-BR": "EUA",
        "ru": "США",
        "zh-CN": "美国"
      }
    },
    "registeredCountry": {
      "geonameId": 6252001,
      "isoCode": "US",
      "names": {
        "de": "Vereinigte Staaten",
        "en": "United States",
        "es": "Estados Unidos",
        "fr": "États Unis",
        "ja": "アメリカ",
        "pt-BR": "EUA",
        "ru": "США",
        "zh-CN": "美国"
      },
      "isInEuropeanUnion": false
    },
    "traits": {
      "isAnonymous": false,
      "isAnonymousProxy": false,
      "isAnonymousVpn": false,
      "isHostingProvider": false,
      "isLegitimateProxy": false,
      "isPublicProxy": false,
      "isResidentialProxy": false,
      "isSatelliteProvider": false,
      "isTorExitNode": false,
      "ipAddress": "185.199.108.0",
      "network": "185.199.108.0/25"
    },
    "location": {
      "accuracyRadius": 1000,
      "latitude": 34.0544,
      "longitude": -118.244,
      "timeZone": "America/Los_Angeles"
    },
    "subdivisions": [
      {
        "geonameId": 5332921,
        "isoCode": "CA",
        "names": {
          "de": "Kalifornien",
          "en": "California",
          "es": "California",
          "fr": "Californie",
          "ja": "カリフォルニア州",
          "pt-BR": "Califórnia",
          "ru": "Калифорния",
          "zh-CN": "加州"
        }
      }
    ]
  }
}
```

#### Example invalid request:

http://localhost:3000/api/v1/ip/555.555.555.555
```
{"status":{"responseCode":"400","message":"Invalid IP address detected"}}
```
