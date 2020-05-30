"use strict";
// Can add logging libraries or transport log to file/db
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = {
    info: (message, ...params) => {
        console.log(message, ...params);
    },
    error: (message, ...params) => {
        console.error(message, ...params);
    },
    debug: (message, ...params) => {
        console.debug(message, ...params);
    },
};
