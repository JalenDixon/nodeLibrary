"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microsoft_1 = require("./microsoft");
// useMicrosoft.createExcelFromJson("../src/resources/", 'analysts', '../src/resources/', 'didItWork', "AllAnalysts")
const stringObj = "{\n" +
    "\t\t\t\"Name\": \"Pookie\",\n" +
    "\t\t\t\"Position\": \"Hay\",\n" +
    "\t\t\t\"Trg\": true,\n" +
    "\t\t\t\"Trainer\": true,\n" +
    "\t\t\t\"Available\": true\n" +
    "\t\t}";
const objOBJ = JSON.parse(stringObj);
microsoft_1.useMicrosoft.appendIntoExcel("../src/resources/", "didItWork", stringObj);
//# sourceMappingURL=playground.js.map