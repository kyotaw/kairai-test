'use strict';

const monoService = require('../services/mono_service')
    , shortcut = require('./response_shortcuts');

const monoControlelr = {

    create(req, res) {
        monoService.createMono(req.body).then((mono) => {
            shortcut.successResponse(res, mono);
        }, (err) => {
            shortcut.error500Response(res, err);
        });
    }
}

module.exports = monoControlelr;
