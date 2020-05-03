'use strict';

// #############################################################################

let stamp = {
    timestamp: '',
    setTimestamp: function () {
        this.timestamp = new Date().getTime().toString();
        process.env.TIMESTAMP = this.timestamp;

        console.log(`process.env.TIMESTAMP: ${process.env.TIMESTAMP}`);

        return process.env.TIMESTAMP;
    }
};

stamp.setTimestamp();

console.log(`process.env.TIMESTAMP: ${process.env.TIMESTAMP}`);

module.exports = stamp;
