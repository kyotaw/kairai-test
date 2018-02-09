'use strict';

const GeoLocation = require('./geo_location').GeoLocation
    , dataSourceRepository = require('./data_source_repository');

class Geo {

    static async getDataSourcesInside(area, sourceType) {
        const centerLocation = new GeoLocation(area.latitude, area.longitude);
        const dist = area.radius * Math.sqrt(2)
        const leftBottom = centerLocation.calcDestinationLocation(dist, 225);
        const rightTop = centerLocation.calcDestinationLocation(dist, 45);
        const dataSources = await dataSourceRepository.getByGeoBounds({ leftBottom: leftBottom, rightTop: rightTop }, sourceType);
        return dataSources.filter(d => { return centerLocation.isPointInCircle(d.location, area.radius) });
    }

}

module.exports.Geo = Geo;
