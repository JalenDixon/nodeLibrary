// Requiring the module
import {stringify} from "querystring";
import * as XL from "xlsx";
import * as fs from 'fs'
import {throws} from "assert";

const excelColumns = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('')

class Microsoft {
	readSheets(path: string, excelName: string, showResult: boolean): {}[] {
		let excelJsonArray: any[];
		const fullPath = path + excelName + ".xlsx";
		const file = XL.readFile(fullPath, {cellDates: true});
		const sheets = file.SheetNames;
		for (let i = 0; i < sheets.length; i++) {
			const temp = XL.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
			temp.forEach((res) => {
				excelJsonArray.push(res);
			});
		}

		showResult ? console.log(excelJsonArray) : null;
		return excelJsonArray
	}

	readSingleSheet(
		path: string,
		excelName: string,
		sheetName?: string,
		showResult?: boolean
	) {
		const fullPath = path + excelName + ".xlsx";
		const file = XL.readFile(fullPath, {cellDates: true});
		const sheet = file.SheetNames;
		const targetSheet = sheetName ? sheetName : sheet[0]
		const sheetData = XL.utils.sheet_to_json(file.Sheets[targetSheet]);
		console.log(sheet, sheetData)
	}

	makeEmptyExcel(path: string, excelName: string) {
		const fullPath = path + excelName + ".xlsx";
		let workBook = XL.utils.book_new()
		let emptyData = []
		let worksheet = XL.utils.json_to_sheet(emptyData)
		XL.utils.book_append_sheet(workBook, worksheet, excelName)
		XL.writeFile(workBook, fullPath)
	}

	createExcelFromJson(jsonPath: string, jsonName: string, excelPath: string, excelName: string, parentAttribute: string) {
		const dataArray = []
		const fullJsonPath = jsonPath + jsonName + '.json'
		const fullExcelPath = excelPath + excelName + '.xlsx'
		let workBook = XL.utils.book_new()
		let data = JSON.parse(fs.readFileSync(fullJsonPath, {encoding: "utf8"}))
		data[parentAttribute].forEach((item) => {
			dataArray.push(item)
		})
		let worksheet = XL.utils.json_to_sheet(dataArray)
		XL.utils.book_append_sheet(workBook, worksheet, excelName)
		XL.writeFile(workBook, fullExcelPath, {cellDates: true})
		console.log(`Your Spreadsheet ${excelName} was created. It is located at ${fullExcelPath}`)
	}

	appendIntoExcel(excelPath: string, excelName: string, data: Object | string, sheetName?: string) {
		const objectResolver: Object = typeof data == 'object' ? data : typeof data == 'string' ? JSON.parse(data) : console.log(`The type of ${typeof data} is not a string or an Object.`)
		const wb = XL.readFile(excelPath + excelName + '.xlsx', {cellText: true, cellDates: true})
		const ws = wb.Sheets[sheetName ? sheetName : excelName]
		const f = _ => _ < 0 ? '' : f(_ / 26 - 1) + String.fromCharCode(_ % 26 + 65)
		const excelTopRowArray = []
		const excelRowEntryObj: Object = {}
		const excelTopRowEntryObj: Object = {}
		for (let i = 0; i < Object.keys(objectResolver).length; i++) {
			excelRowEntryObj[f(i)] = Object.values(objectResolver)[i]
			excelTopRowEntryObj[f(i)] = Object.keys(objectResolver)[i]
			excelTopRowArray.push(f(i))
		}
		XL.utils.sheet_add_json(ws, [
			excelRowEntryObj
		], {header: excelTopRowArray!!, skipHeader: true, origin: -1});
		XL.writeFile(wb, excelPath + excelName + '.xlsx')

	}

	editCell() {

	}

	deleteExcel() {

	}
}

export const useMicrosoft = new Microsoft();
