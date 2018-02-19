'use strict';

function loginResponse(userId, accessToken) {
    let data = accessToken.toDict();
    data.userId = userId;
    return data;
}

module.exports = {
    loginResponse: loginResponse,
}
