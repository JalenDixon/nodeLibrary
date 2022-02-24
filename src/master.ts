import * as fs from "node:fs";
import {isArgumentsObject} from "util/types";
import * as https from "https";


// file system class


class Node {
	write(filePath: string, data: any) {
		return fs.writeFile(filePath, data, (err) =>
			err ? console.log(err) : console.log(`File was created at ${filePath}`)
		);
	}

	append(filePath: string, data: any) {
		return fs.appendFile(filePath, data, (err) =>
			err
				? console.log(err)
				: console.log(`Appended data to file at ${filePath}`)
		);
	}

	checkFile(filePath: string) {
		return fs.access(filePath, (err) =>
			err
				? console.log(err)
				: console.log(
					`This file either doesnt exist or you're not allowed to view it, at ${filePath}`
				)
		);
	}

	deleteFile(filePath: string) {
		return fs.rm(filePath, (err) =>
			err
				? console.log(
					`This file either doesnt exist or you're pointing in the wrong place`
				)
				: console.log("File successfully removed")
		);
	}

	moveFile(oldFilePath: string, newFilePath: string) {
		return fs.rename(oldFilePath, newFilePath, (err) =>
			err
				? console.log(err)
				: `File successfully moved from ${oldFilePath} to ${newFilePath}`
		);
	}

	copyFile(sourcePath: string, destinationPath: string) {
		return fs.copyFile(sourcePath, destinationPath, (err) =>
			err
				? console.log(err)
				: `File successfully copied from ${sourcePath} to ${destinationPath}`
		);
	}

	readFile(filePath: string): any {
		return fs.readFile(filePath, (err, data) =>
			err ? console.log(err) : data
		);
	}

	makeDir(directoryShape: string, multipleDirs: boolean) {
		return fs.mkdir(directoryShape, {recursive: multipleDirs}, (err) =>
			err
				? console.log(err)
				: `Directory with the shape of ${directoryShape} successfully created.`
		);
	}

	deleteDir(dirPath: string, multipleDirs: boolean) {
		return fs.rmdir(dirPath, {recursive: multipleDirs}, (err) =>
			err ? console.log(err) : `${dirPath} removed.`
		);
	}

	renameDir(oldPath: string, newPath: string) {
		return fs.renameSync(oldPath, newPath);
	}

	moveDir(oldPath: string, newPath: string) {
		return fs.renameSync(oldPath, newPath);
	}

	getSingleUrlParam(grabbedURL: string, param: string) {
		const tempUrl = new URL(grabbedURL);
		const search_param = tempUrl.searchParams;
		return search_param.get(param);
	}

	getUrlParameters(grabbedURL: string, params: string[]): string[] {
		const tempURL = new URL(grabbedURL);
		const search_params = tempURL.searchParams;
		let i = 0;
		let finalReturnArray: string[] = [];
		params.forEach(grabParams);

		function grabParams() {
			let tempValue = search_params.get(params[i]);
			finalReturnArray.push(!tempValue ? "No value" : tempValue);
			i++;
		}

		return finalReturnArray;
	}

	grabUrlParamsKeysAndValues(grabbedURL: string) {
		const tempURL = new URL(grabbedURL);
		return tempURL.searchParams.entries();
	}

	loopOverDir(
		dirPath: string,
		action: "move" | "delete" | "append" | "read",
		newPath?: string,
		data?: any
	) {
		return fs.readdir(dirPath, (err, files) =>
			err
				? console.log(`Failed to grab directory at ${dirPath}`)
				: files.forEach((item) => {
					let tempNode = new Node();
					let truePath = `${dirPath}/${item}`;
					action == "move"
						? tempNode.renameDir(truePath, newPath)
						: action == "delete"
							? tempNode.deleteFile(truePath)
							: action == "append"
								? tempNode.append(truePath, data)
								: action == "read"
									? tempNode.readFile(truePath)
									: null;
				})
		);
	}

	watchFileOrDir(
		filePath: string,
		keepWatching: boolean,
		pathType: "dir" | "file",
		callBackFun: Function,
		watchFor: "rename" | "change"
	) {
		console.log("I am watching you");
		return fs.watch(
			filePath,
			{persistent: keepWatching, recursive: pathType == "dir"},
			(watchFor, filePath) => {
				callBackFun();
				console.log(`Your file or directory at ${filePath} has been changed.`);
			}
		);
	}

	getReq(url: string, callbackFun?: Function) {
		https.get(url, (res) => {
			console.log(`Your status-code is ${res.statusCode}`)
			console.log(`Your headers are ${JSON.stringify(res.headers)}`)
			res.on('error', error => {
				console.error(error)
			})
				.on('data', (d) => {
					process.stdout.write(d)
					callbackFun != undefined || null ? callbackFun(d) : null
				})
		})

	}

	postPutOrDeleteReq(options, data?: Object) {
		let postBody = JSON.stringify(data)
		const req = https.request(options, (res) => {
			console.log(`Your status-code is ${res.statusCode}`)
			console.log(`Your headers are ${JSON.stringify(res.headers)}`)
			res.on('data', (d) => {
				process.stdout.write(d)
			})
			res.on('end', () => {
				console.log(postBody)
			})
			req.on('error', (e) => {
				console.error(e)
			})
		})
		postBody ? req.write(postBody) : null
		req.end()
	}

}

export const useNode = new Node()
