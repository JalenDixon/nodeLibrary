"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var master_1 = require("./master");
var playground = new master_1.Node();
playground.watchFileOrDir("../src/testdir/jalen1.txt", true, "file", addNum, "change");
function addNum() {
    return 1 + 1;
}
//# sourceMappingURL=playground.js.map