'use strict';

function userResponse(user) {
    let params = {
        email: user.email
    }
    return params;
}

module.exports = {
    userResponse: userResponse
}
