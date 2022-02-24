"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var master_1 = require("./master");
var dataToPost = {
    name: "jalen",
    job: "its friday bitches"
};
var options = {
    hostname: 'reqres.in',
    path: '/api/users',
    method: 'POST',
    header: {
        'Content-Type': 'application/json'
    }
};
master_1.useNode.postPutOrDeleteReq(options, dataToPost);
// useNode.getReq("https://httpbin.org/post")
//# sourceMappingURL=playground.js.map