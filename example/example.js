"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dist_1 = __importDefault(require("../dist"));
var input = {
    aNumber: "1.0",
    aString: "hello"
};
var expectedResult = {
    aNumber: 1.0,
    aString: "hello"
};
var result = dist_1["default"](input);
console.log("input:", input);
console.log("result:", result);
