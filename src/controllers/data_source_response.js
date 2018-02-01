'use strict';

const array = require('../helpers/array');

function dataSourcesResponse(dataSources) {
    if (array.isArray(dataSources)) {
        let dataArray = [];
        for (let ds of dataSources) {
            let dict = ds.toDict();
            delete dict['monoId'];
            delete dict['specId'];
            dataArray.push(dict);
        }
        return dataArray;
    } else {
        let data = dataSources.toDict();
        delete data['monoId'];
        delete data['specId'];
        return data;
    }
}

module.exports = {
    dataSourcesResponse: dataSourcesResponse
}
