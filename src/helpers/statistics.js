'use strict';

const array = require('./array');

function average(values) {
    const len = values.length;
    if (len === 0) {
        return 0;
    }
    if (array.isArray(values[0])) {
        sum = values.reduce((prev, cur) => {
            for (let i = 0; i < prev.length; ++i) {
                prev[i] += cur[i];
            }
        }); 
        return sum.map(s => {s / len});
    } else {
        return values.reduce((prev, cur) => { prev + cur }) / len;
    }
}
