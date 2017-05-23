'use strict';

/**
 *
 * JavaScript API wrapper for locating electric vehicle charging stations on NREL
 * National Renewable Energy Laboratory (NREL) API v1: https://developer.nrel.gov
 *
 * @author Johnathan Miller <hello@johnathanmiller.com>
 * @version 1.0.0
 *
 */

const request = require('request');
const querystring = require('querystring');

let api_endpoint = 'https://developer.nrel.gov/api/alt-fuel-stations/v1';

let EVStation = function(api_key, format) {

    this.data = {
        api_key: api_key,
        format: format
    };

};

module.exports = EVStation;

/**
 *
 * Retrieve all stations
 * Return a full list of electric charging stations that match your query.
 *
 * @param array $data
 * @param int $limit
 * @callback
 * @return array
 *
 */

EVStation.prototype.getAll = function(data, limit, callback) {

    this.data.fuel_type = 'ELEC';
    this.data.limit = (limit < 1 || limit == null) ? 1 : limit;

    for (let key in data) {
        this.data[key] = data[key];
    }

    let url = api_endpoint +'?'+ querystring.stringify(this.data);

    this._request('GET', url, function(err, body) {
        callback(err, body);
    });

};

/**
 *
 * Retrieve station directly by ID.
 * Fetch the details of a specific electric charging station given the station's ID.
 *
 * @param int $id
 * @callback
 * @return array
 *
 */

EVStation.prototype.get = function(id, callback) {

    let url = api_endpoint +'/'+ id +'?'+ querystring.stringify(this.data);

    this._request('GET', url, function(err, body) {
        callback(err, body);
    });

};

/**
 *
 * Return the nearest electric charging stations within a distance of a given location.
 *
 * @param array $data
 * @param int $limit
 * @param int $offset
 * @callback
 * @return array
 *
 */

EVStation.prototype.nearest = function(data, limit, offset, callback) {

    this.data.fuel_type = 'ELEC';
    this.data.limit = (limit < 1 || limit == null) ? 1 : limit;
    this.data.offset = (offset == null) ? 0 : offset;

    for (let key in data) {
        this.data[key] = data[key];
    }

    let url = api_endpoint +'/nearest?'+ querystring.stringify(this.data);

    this._request('GET', url, function(err, body) {
        callback(err, body);
    });

};

/**
 *
 * Find electric charging stations within a distance of a driving route.
 *
 * @param array $data
 * @param int $limit
 * @param int $offset
 * @callback
 * @return array
 *
 */

EVStation.prototype.nearbyRoute = function(data, limit, offset, callback) {

    this.data.fuel_type = 'ELEC';
    this.data.limit = (limit < 1 || limit == null) ? 1 : limit;
    this.data.offset = (offset == null) ? 0 : offset;

    for (let key in data) {
        this.data[key] = data[key];
    }

    let url = api_endpoint +'/nearby-route?'+ querystring.stringify(this.data);

    this._request('GET', url, function(err, body) {
        callback(err, body);
    });

};

/**
 *
 * Retrieve the date when the alternative fuel stations data were last updated.
 * @callback
 * @return array - Key 'last_updated' with datetime value in ISO 8601 format.
 *
 */

EVStation.prototype.lastUpdated = function(callback) {

    let url = api_endpoint +'/last-updated?'+ querystring.stringify(this.data);

    this._request('GET', url, function(err, body) {
        callback(err, body);
    });

};

/**
 *
 * Method used to communicate with REST API server.
 *
 * @param string $method
 * @param string $url
 * @callback
 * @return array - Associative array containing 'status_code' and 'response'
 *
 */

EVStation.prototype._request = function(method, url, callback) {

    if (method === 'GET') {

        request.get({
            url: url

        }, function(err, res, body) {

            let response_body = {
                status_code: res.statusCode,
                response: JSON.parse(body)
            }

            callback(err, response_body);

        });

    }

}