'use strict';

const MonoEntity = require('../models/entities/mono_entity').MonoEntity;

const monoRepository = {

    create(mono) {
        return new Promise((resolve, reject) => {
            MonoEntity.create(mono.toDict()).then((inst) => {
                mono.id = inst.id;
                resolve(mono);
            }, (err) => {
                reject(err);
            });
        });
    }
}

module.exports = monoRepository;
