'use strict';

const factory = require('../models/mono_factory')
    , repository = require('../models/mono_repository');

const monoService = {

    createMono(params) {
        const mono = factory.create(params);
        return repository.create(mono);
    }
}

module.exports = monoService;
