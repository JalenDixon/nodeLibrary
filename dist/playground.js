"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const master_1 = require("./master");
const pubKey = master_1.useNode.readFile("../src/jalenpubkey");
const privKey = master_1.useNode.readFile("../src/jalenprivkey");
master_1.useNode.signAndVerify("hello world", privKey, pubKey);
//# sourceMappingURL=playground.js.map