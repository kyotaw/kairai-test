'use strict';

function loginResponse(userId, accessToken) {
    let data = accessToken.toDict();
    data.userId = userId;
    return data;
}

function loggedInResponse(loggedIn) {
    return {
        loggedIn: loggedIn
    }
}

module.exports = {
    loginResponse: loginResponse,
    loggedInResponse: loggedInResponse,
}
