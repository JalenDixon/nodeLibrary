"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMicrosoft = void 0;
const XL = require("xlsx");
const fs = require("fs");
const excelColumns = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
class Microsoft {
    readSheets(path, excelName, showResult) {
        let excelJsonArray;
        const fullPath = path + excelName + ".xlsx";
        const file = XL.readFile(fullPath, { cellDates: true });
        const sheets = file.SheetNames;
        for (let i = 0; i < sheets.length; i++) {
            const temp = XL.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
            temp.forEach((res) => {
                excelJsonArray.push(res);
            });
        }
        showResult ? console.log(excelJsonArray) : null;
        return excelJsonArray;
    }
    readSingleSheet(path, excelName, sheetName, showResult) {
        const fullPath = path + excelName + ".xlsx";
        const file = XL.readFile(fullPath, { cellDates: true });
        const sheet = file.SheetNames;
        const targetSheet = sheetName ? sheetName : sheet[0];
        const sheetData = XL.utils.sheet_to_json(file.Sheets[targetSheet]);
        console.log(sheet, sheetData);
    }
    makeEmptyExcel(path, excelName) {
        const fullPath = path + excelName + ".xlsx";
        let workBook = XL.utils.book_new();
        let emptyData = [];
        let worksheet = XL.utils.json_to_sheet(emptyData);
        XL.utils.book_append_sheet(workBook, worksheet, excelName);
        XL.writeFile(workBook, fullPath);
    }
    createExcelFromJson(jsonPath, jsonName, excelPath, excelName, parentAttribute) {
        const dataArray = [];
        const fullJsonPath = jsonPath + jsonName + '.json';
        const fullExcelPath = excelPath + excelName + '.xlsx';
        let workBook = XL.utils.book_new();
        let data = JSON.parse(fs.readFileSync(fullJsonPath, { encoding: "utf8" }));
        data[parentAttribute].forEach((item) => {
            dataArray.push(item);
        });
        let worksheet = XL.utils.json_to_sheet(dataArray);
        XL.utils.book_append_sheet(workBook, worksheet, excelName);
        XL.writeFile(workBook, fullExcelPath, { cellDates: true });
        console.log(`Your Spreadsheet ${excelName} was created. It is located at ${fullExcelPath}`);
    }
    appendIntoExcel(excelPath, excelName, data, sheetName) {
        const objectResolver = typeof data == 'object' ? data : typeof data == 'string' ? JSON.parse(data) : console.log(`The type of ${typeof data} is not a string or an Object.`);
        const wb = XL.readFile(excelPath + excelName + '.xlsx', { cellText: true, cellDates: true });
        const ws = wb.Sheets[sheetName ? sheetName : excelName];
        const f = _ => _ < 0 ? '' : f(_ / 26 - 1) + String.fromCharCode(_ % 26 + 65);
        const excelTopRowArray = [];
        const excelRowEntryObj = {};
        const excelTopRowEntryObj = {};
        for (let i = 0; i < Object.keys(objectResolver).length; i++) {
            excelRowEntryObj[f(i)] = Object.values(objectResolver)[i];
            excelTopRowEntryObj[f(i)] = Object.keys(objectResolver)[i];
            excelTopRowArray.push(f(i));
        }
        // console.log(excelTopRowArray, excelRowEntryObj)
        // let ws = XL.utils.json_to_sheet([
        // 	excelTopRowEntryObj
        // ], {header: excelTopRowArray!!, skipHeader: true});
        XL.utils.sheet_add_json(ws, [
            excelRowEntryObj
        ], { header: excelTopRowArray, skipHeader: true, origin: -1 });
        XL.writeFile(wb, excelPath + excelName + '.xlsx');
    }
    editCell() {
    }
    deleteExcel() {
    }
}
exports.useMicrosoft = new Microsoft();
//# sourceMappingURL=microsoft.js.map