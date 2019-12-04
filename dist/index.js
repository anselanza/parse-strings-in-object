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
    return Object.keys(obj).reduce(function (acc, key) {
        var _a, _b, _c;
        var value = obj[key];
        if (value === "true") {
            return __assign(__assign({}, acc), (_a = {}, _a[key] = true, _a));
        }
        if (value === "false") {
            return __assign(__assign({}, acc), (_b = {}, _b[key] = false, _b));
        }
        return __assign(__assign({}, acc), (_c = {}, _c[key] = value, _c));
    }, {});
};
module.exports = parseKeys;
//# sourceMappingURL=index.js.map