'use strict';

const userRepository = require('../models/user_repository')
    , errors = require('../errors')

const userService = {

    async createSocialUser(params) {
        const user = await userRepository.getBySocialId(params.socialUserId, params.socialLoginSystem);
        if (user) {
            throw new errors.KairaiError(errors.ErrorTypes.USER_ALREADY_EXISTS);
        }
        return await userRepository.create(params);
    },

    async getBySocialId(socialUserId, socialLoginSystem) {
        return await userRepository.getBySocialId(socialUserId, socialLoginSystem);
    }

}

module.exports = userService;
