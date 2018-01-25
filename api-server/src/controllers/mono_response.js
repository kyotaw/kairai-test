'use strict';

const array = require('../helpers/array');

function monosResponse(monos) {
    if (array.isArray(monos)) {
        let resArray = [];
        for (let m of monos) {
            let dict = m.toDict();
            dict['dataSources'] = dataSourcesResponse(m.dataSources);
            resArray.push(dict);
        }
        return resArray;
    } else {
        let dict = monos.toDict();
        dict['dataSources'] = dataSourcesResponse(monos.dataSources);
        return dict;
    }
}

function dataSourcesResponse(dataSources) {
    if (array.isArray(dataSources)) {
        let dataArray = [];
        for (let ds of dataSources) {
            let dict = ds.toDict();
            delete dict['monoId'];
            dataArray.push(dict);
        }
        return dataArray;
    } else {
        let data = dataSources.toDict();
        delete data['monoId'];
        return data;
    }
}

module.exports = {
    monosResponse: monosResponse,
    dataSourcesResponse: dataSourcesResponse
}
