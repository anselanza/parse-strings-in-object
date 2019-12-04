"use strict";
const parseKeys = (obj) => Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const result = convert(value);
    return Object.assign(Object.assign({}, acc), { [key]: result });
}, {});
const convert = (value) => {
    let result = value;
    if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
            return convertArray(value);
        }
        else {
            return parseKeys(value);
        }
    }
    if (value === "true") {
        result = true;
    }
    if (value === "false") {
        result = false;
    }
    if (value === "null") {
        result = null;
    }
    if (value === "undefined") {
        result = undefined;
    }
    if (!isNaN(parseFloat(value)) &&
        value === parseFloat(value).toString()) {
        result = parseFloat(value);
    }
    return result;
};
const convertArray = (a) => a.map(el => convert(el));
module.exports = parseKeys;
//# sourceMappingURL=index.js.map