'use strict';

describe('EVStation', function() {

    let getEVStation = require('../lib/evstation');
    let evstation = new getEVStation('DEMO_KEY', 'json');

    describe('Station tests', function() {
        it('should get all stations', function(done) {
            evstation.getAll({zip: 98004}, 10, done);
        });
        it('should get station by ID', function(done) {
            evstation.get(123, done);
        });
        it('should get nearest stations', function(done) {
            evstation.nearest({location: 'Bellevue, WA'}, 10, 0, done);
        });
        it('should get stations on nearby route', function(done) {
            evstation.nearbyRoute({route: 'LINESTRING(-74.0 40.7, -87.63 41.87, -104.98 39.76)'}, 10, 0, done);
        });
        it('should get the date when the stations were last updated', function(done) {
            evstation.lastUpdated(done);
        });
    });

});