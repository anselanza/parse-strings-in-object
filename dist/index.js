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
    switch (value) {
        case "true":
            return true;
        case "false":
            return false;
        case "null":
            return null;
        case "undefined":
            return undefined;
        default:
            // other cases
            if (!isNaN(parseFloat(value)) &&
                value === parseFloat(value).toString()) {
                return parseFloat(value);
            }
            else {
                if (isArrayLikeString(value)) {
                    return convertArrayLikeString(value);
                }
                else {
                    // All else fails, return value as is...
                    return value;
                }
            }
    }
};
const convertArray = (a) => a.map(el => convert(el));
const isArrayLikeString = (s) => {
    if (typeof s === "string") {
        const commaSeparated = s.split(",");
        if (commaSeparated.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};
const convertArrayLikeString = (s, token = ",") => convert(s.split(token));
module.exports = parseKeys;
//# sourceMappingURL=index.js.map