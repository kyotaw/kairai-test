'use strict';


function successResponse(res, data=null) {
    if (data) {
        res.json({status: 'success', data: data.toDict()});
    } else {
        res.json({status: 'success'});
    }
}

function error500Response(res, err) {
    res.status(500).json({status: 'error', message: err.message});
}

function jsonResponseOr500Error(res, err, data) {
    if (err) {
        error500Response(res, err);
    } else {
        successResponse(res, data);
    }
}


module.exports = {
    successResponse: successResponse,
    error500Response: error500Response,
    jsonResponseOr500Error: jsonResponseOr500Error,
}
