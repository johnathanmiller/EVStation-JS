# EVStation JS
JavaScript API wrapper for locating electric vehicle charging stations on NREL.
National Renewable Energy Laboratory (NREL) API v1: https://developer.nrel.gov
Get your API Key at https://developer.nrel.gov/signup/

## Rate Limiting
https://developer.nrel.gov/docs/rate-limits/

## Installation
Download evstation-js from GitHub or install using npm
```
npm install evstation-js
```
Import module
```js
let getEVStation = require('evstation-js');
```
**Instantiate EVStation**
You'll need to pass in two arguments into EVStation. The first parameter is expecting an API key to make successful requests and the second parameter is used to format the request, `json` or `xml`.
```js
let evstation = new getEVStation('DEMO_KEY', 'json');
```

## Examples
### Get All Stations
```js
evstation.getAll({zip: 98004}, 10, function(err, res) {
    console.log(res.response);
});
```
### Get Station by ID
```js
evstation.get(123, function(err, res) {
    console.log(res.response);
});
```
### Nearest Stations
```js
evstation.nearest({location: 'Bellevue, WA'}, 10, 0, function(err, res) {
    console.log(res.response);
});
```
### Stations Nearby Route
```js
evstation.nearbyRoute({route: 'LINESTRING(-74.0 40.7, -87.63 41.87, -104.98 39.76)'}, 10, 0, function(err, res) {
    console.log(res.response);
});
```
### Last Updated Date
```js
evstation.lastUpdated(function(err, res) {
    console.log(res.response);
});
```