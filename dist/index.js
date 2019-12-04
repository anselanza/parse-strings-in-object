"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var parseKeys = function (obj) {
    return Object.keys(obj).reduce(function (acc, curr) {
        var _a, _b, _c;
        var key = curr;
        var val = obj[curr];
        if (typeof val === "object" && val !== null) {
            if (Array.isArray(val)) {
                return __assign(__assign({}, acc), (_a = {}, _a[key] = val, _a));
            }
            else {
                var subtree = parseKeys(val);
                return __assign(__assign({}, acc), (_b = {}, _b[key] = subtree, _b));
            }
        }
        else {
            if (val === "true") {
                val = true;
            }
            if (val === "false") {
                val = false;
            }
            if (val === "null") {
                val = null;
            }
            // if (val === 'undefined') val = undefined;
            if (!isNaN(parseFloat(val)) && val === parseFloat(val).toString()) {
                val = parseFloat(val);
            }
            return __assign(__assign({}, acc), (_c = {}, _c[curr[0]] = val, _c));
        }
    }, {});
};
module.exports = parseKeys;
//# sourceMappingURL=index.js.map