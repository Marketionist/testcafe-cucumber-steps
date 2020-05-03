'use strict';

// #############################################################################

let stamp = {
    _timestamp: '',
    resetTimestamp: function () {
        this._timestamp = new Date().getTime().toString();
        process.env.TIMESTAMP = this._timestamp;

        console.log(`process.env.TIMESTAMP: ${process.env.TIMESTAMP}`);

        return process.env.TIMESTAMP;
    },
    getTimestamp: function () {
        process.env.TIMESTAMP = this._timestamp.length > 0 ? this._timestamp : this.resetTimestamp()

        return process.env.TIMESTAMP;
    }
};

stamp.getTimestamp();

console.log(`process.env.TIMESTAMP: ${process.env.TIMESTAMP}`);

module.exports = stamp;
