"use strict";
// input = requestObject , arrayofProperties
// output = an object having the requestObject's properties
// 1
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapReqQuerysProperty = void 0;
const mapReqQuerysProperty = (reqObject, keys) => {
    const objectFromQuerys = {};
    for (const key of keys) {
        // eslint-disable-next-line no-prototype-builtins
        if (reqObject && reqObject.hasOwnProperty(key)) {
            objectFromQuerys[key] = reqObject[key];
        }
    }
    return objectFromQuerys;
};
exports.mapReqQuerysProperty = mapReqQuerysProperty;
