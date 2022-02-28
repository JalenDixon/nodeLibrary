"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMicrosoft = void 0;
const XL = require("xlsx");
const fs = require("fs");
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
        let oneDeepArray = data[parentAttribute];
        console.log(oneDeepArray);
        oneDeepArray.forEach((item) => {
            dataArray.push(item);
        });
        let worksheet = XL.utils.json_to_sheet(dataArray);
        XL.utils.book_append_sheet(workBook, worksheet, excelName);
        XL.writeFile(workBook, fullExcelPath, { cellDates: true });
        console.log(`Your Spreadsheet ${excelName} was created. It is located at ${fullExcelPath}`);
    }
    appendIntoExcel(excelPath, excelName, data, sheetName) {
        const parsedData = objectResolver(data);
        const wb = XL.readFile(excelPath + excelName + '.xlsx', { cellText: true, cellDates: true });
        const ws = wb.Sheets[sheetName ? sheetName : excelName];
        const excelTopRowArray = [];
        const excelRowEntryObj = {};
        const excelTopRowEntryObj = {};
        for (let i = 0; i < Object.keys(parsedData).length; i++) {
            excelRowEntryObj[f(i)] = Object.values(parsedData)[i];
            excelTopRowEntryObj[f(i)] = Object.keys(parsedData)[i];
            excelTopRowArray.push(f(i));
        }
        XL.utils.sheet_add_json(ws, [
            excelRowEntryObj
        ], { header: excelTopRowArray, skipHeader: true, origin: -1 });
        XL.writeFile(wb, excelPath + excelName + '.xlsx');
    }
    editCell(excelPath, excelName, cellAddress, replacement, action, sheetName) {
        const wb = XL.readFile(excelPath + excelName + '.xlsx', { cellText: true, cellDates: true });
        const ws = wb.Sheets[sheetName ? sheetName : excelName];
        let desiredCell = ws[cellAddress];
        let cellValue = desiredCell ? desiredCell.v : null;
        let newCellValue;
        action == 'append' ? newCellValue += `${cellValue} ${replacement}` : action == 'delete' ? newCellValue += '' : action == 'replace' ? newCellValue = replacement : console.log(`The input was not a string or number. Your input: ${typeof replacement}`);
        console.log(cellValue);
        desiredCell.v = newCellValue;
        console.log(desiredCell);
        XL.writeFile(wb, excelPath + excelName + '.xlsx');
    }
    getCell(excelPath, excelName, searchValue, sheetName) {
        const wb = fileResolver(excelPath, excelName);
        const ws = wb.Sheets[sheetName ? sheetName : excelName];
        let sheetValues = Object.values(ws);
        let returnedCellObjArray = [];
        for (let i = 1; i < sheetValues.length; i++) {
            let tempObj = sheetValues[i];
            tempObj.v == searchValue ? returnedCellObjArray.push(tempObj) : null;
        }
        return returnedCellObjArray;
    }
    getColumn(excelPath, excelName, searchColumn, sheetName) {
        const targetColumn = exports.useMicrosoft.getCell(excelPath, excelName, searchColumn)[0].v;
        const wb = fileResolver(excelPath, excelName);
        const ws = wb.Sheets[sheetName ? sheetName : excelName];
        let sheetKeys = Object.keys(ws);
        let sheetValues = Object.values(ws);
        let returnedCellObjArray = [];
        let letterToUseForSearch;
        for (let i = 1; i < sheetKeys.length; i++) {
            main.letter = sheetKeys[i].split('')[0];
            main.number = sheetKeys[i].split('').slice(1).join('');
            main.child.name = sheetValues[i];
            main.child.name.v == searchColumn ? letterToUseForSearch = main.letter : null;
            main.letter == letterToUseForSearch ? returnedCellObjArray.push(sheetValues[i]) : i;
        }
        console.log(returnedCellObjArray.slice(1));
    }
    getRow(excelPath, excelName, cellValue, sheetName) {
        const wb = fileResolver(excelPath, excelName);
        const ws = wb.Sheets[sheetName ? sheetName : excelName];
        let sheetKeys = Object.keys(ws);
        let sheetValues = Object.values(ws);
        let returnedCellObjArray = [];
        let numberToUseForSearch;
        for (let i = 0; i < sheetKeys.length; i++) {
            main.letter = sheetKeys[i].split('')[0];
            main.number = sheetKeys[i].split('').slice(1).join('');
            main.child.name = sheetValues[i];
            main.child.name.v == cellValue ? numberToUseForSearch = main.number : null;
            console.log(numberToUseForSearch);
            // main.number == numberToUseForSearch ? returnedCellObjArray.push(sheetValues[i]) : i
        }
        for (let i = 0; i < sheetKeys.length; i++) {
            main.letter = sheetKeys[i].split('')[0];
            main.number = sheetKeys[i].split('').slice(1).join('');
            main.child.name = sheetValues[i];
            main.number == numberToUseForSearch ? returnedCellObjArray.push(sheetValues[i]) : null;
        }
        console.log(returnedCellObjArray);
    }
}
const f = _ => _ < 0 ? '' : f(_ / 26 - 1) + String.fromCharCode(_ % 26 + 65);
function fileResolver(excelPath, excelName) {
    return XL.readFile(excelPath + excelName + '.xlsx', { cellText: true, cellDates: true });
}
const main = {
    letter: "",
    number: 0,
    child: {
        name: ""
    },
    init: function () {
        this.child.parent = this;
        delete this.init;
        return this;
    }
}.init();
function objectResolver(data) {
    return typeof data == 'object' ? data : typeof data == 'string' ? JSON.parse(data) : console.log(`The type of ${typeof data} is not a string or an Object.`);
}
exports.useMicrosoft = new Microsoft();
//# sourceMappingURL=microsoft.js.map