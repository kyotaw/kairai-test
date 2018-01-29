'use strict';

const array = require('../helpers/array')
,   dataSourceResponse = require('./data_source_response');

function monosResponse(monos) {
    if (array.isArray(monos)) {
        let resArray = [];
        for (let m of monos) {
            let dict = m.toDict();
            dict['dataSources'] = dataSourceResponse.dataSourcesResponse(m.dataSources);
            resArray.push(dict);
        }
        return resArray;
    } else {
        let dict = monos.toDict();
        dict['dataSources'] = dataSourceResponse.dataSourcesResponse(monos.dataSources);
        return dict;
    }
}

module.exports = {
    monosResponse: monosResponse,
}
