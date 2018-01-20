'use strict';

const Mono = require('./mono').Mono
    , MonoId = require('./mono_id').MonoId
    , MonoEntity = require('./entities/mono_entity').MonoEntity;

const monoFactory = {

    create(params) {
        if (params instanceof Object) {
            return this._createFromDict(params); 
        } else if (params instanceof MonoEntity) {
            return this._createFromEntity(params);
        } else {
            throw new Error('invalid param type');
        }
    },

    _createFromDict(params) {
        const monoId = new MonoId(params.modelNumber, params.serialNumber, params.vendorName);
        return new Mono(params.name, monoId);
    },

    _createFromEntity(params) {
        const monoId = new MonoId(params.modelNumber, params.serialNumber, params.vendorName);
        let mono = new Mono(params.name, monoId);
        mono.id = params.id;
        return mono;
    }
}

module.exports = monoFactory;
