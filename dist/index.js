"use strict";
const parseKeys = (obj) => Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    let result = value;
    if (typeof value === "object" && value !== null) {
        // typeof(null) is also "object"
        // typeof (array) is also "object"
        if (Array.isArray(value)) {
            if (value.length > 0) {
                result = "boo";
                // result = value.reduce((arr, el) => [...arr, parseKeys(el)], []);
            }
            else {
                result = value;
            }
        }
        else {
            result = parseKeys(value);
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
    if (!isNaN(parseFloat(value)) && value === parseFloat(value).toString()) {
        result = parseFloat(value);
    }
    return Object.assign(Object.assign({}, acc), { [key]: result });
}, {});
module.exports = parseKeys;
//# sourceMappingURL=index.js.map