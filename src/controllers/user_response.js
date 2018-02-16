'use strict';

function userResponse(user) {
    let params = user.toDict();
    delete params['password'];
    delete params['salt'];
    return params;
}

module.exports = {
    userResponse: userResponse
}
