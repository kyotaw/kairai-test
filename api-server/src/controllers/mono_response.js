'use strict';

function allDataSourcesResponse(monoHash, dataSources) {
    let dataArray = [];
    for (let ds of dataSources) {
        let dict = ds.toDict();
        delete dict['monoId'];
        dict['monoHash'] = monoHash;
        dataArray.push(dict);
    }
    return dataArray;
}

module.exports = {
    allDataSourcesResponse: allDataSourcesResponse
}
