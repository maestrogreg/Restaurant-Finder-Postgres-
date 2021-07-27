"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var pool = new pg_1.Pool();
var queryObject = {
    query: function (text, params) { return pool.query(text, params); },
};
exports.default = queryObject;
