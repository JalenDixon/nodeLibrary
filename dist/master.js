"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNode = void 0;
const fs = require("node:fs");
const https = require("https");
const child_process_1 = require("child_process");
const process = require("process");
const crypto = require("crypto");
// file system class
class Node {
    write(filePath, data) {
        return fs.writeFile(filePath, data, (err) => err ? console.log(err) : console.log(`File was created at ${filePath}`));
    }
    append(filePath, data) {
        return fs.appendFile(filePath, data, (err) => err
            ? console.log(err)
            : console.log(`Appended data to file at ${filePath}`));
    }
    checkFile(filePath) {
        return fs.access(filePath, (err) => err
            ? console.log(err)
            : console.log(`This file either doesnt exist or you're not allowed to view it, at ${filePath}`));
    }
    deleteFile(filePath) {
        return fs.rm(filePath, (err) => err
            ? console.log(`This file either doesnt exist or you're pointing in the wrong place`)
            : console.log("File successfully removed"));
    }
    moveFile(oldFilePath, newFilePath) {
        return fs.rename(oldFilePath, newFilePath, (err) => err
            ? console.log(err)
            : `File successfully moved from ${oldFilePath} to ${newFilePath}`);
    }
    copyFile(sourcePath, destinationPath) {
        return fs.copyFile(sourcePath, destinationPath, (err) => err
            ? console.log(err)
            : `File successfully copied from ${sourcePath} to ${destinationPath}`);
    }
    readFile(filePath) {
        return fs.readFileSync(filePath, { encoding: "utf8" });
    }
    makeDir(directoryShape, multipleDirs) {
        return fs.mkdir(directoryShape, { recursive: multipleDirs }, (err) => err
            ? console.log(err)
            : `Directory with the shape of ${directoryShape} successfully created.`);
    }
    deleteDir(dirPath, multipleDirs) {
        return fs.rmdir(dirPath, { recursive: multipleDirs }, (err) => err ? console.log(err) : `${dirPath} removed.`);
    }
    renameDir(oldPath, newPath) {
        return fs.renameSync(oldPath, newPath);
    }
    moveDir(oldPath, newPath) {
        return fs.renameSync(oldPath, newPath);
    }
    getSingleUrlParam(grabbedURL, param) {
        const tempUrl = new URL(grabbedURL);
        const search_param = tempUrl.searchParams;
        return search_param.get(param);
    }
    getUrlParameters(grabbedURL, params) {
        const tempURL = new URL(grabbedURL);
        const search_params = tempURL.searchParams;
        let i = 0;
        let finalReturnArray = [];
        params.forEach(grabParams);
        function grabParams() {
            let tempValue = search_params.get(params[i]);
            finalReturnArray.push(!tempValue ? "No value" : tempValue);
            i++;
        }
        return finalReturnArray;
    }
    grabUrlParamsKeysAndValues(grabbedURL) {
        const tempURL = new URL(grabbedURL);
        return tempURL.searchParams.entries();
    }
    loopOverDir(dirPath, action, newPath, data) {
        return fs.readdir(dirPath, (err, files) => err
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
            }));
    }
    watchFileOrDir(filePath, keepWatching, pathType, callBackFun, watchFor) {
        console.log("I am watching you");
        return fs.watch(filePath, { persistent: keepWatching, recursive: pathType == "dir" }, (watchFor, filePath) => {
            callBackFun();
            console.log(`Your file or directory at ${filePath} has been changed.`);
        });
    }
    getReq(url, callbackFun) {
        https.get(url, (res) => {
            console.log(`Your status-code is ${res.statusCode}`);
            console.log(`Your headers are ${JSON.stringify(res.headers)}`);
            res
                .on("error", (error) => {
                console.error(error);
            })
                .on("data", (d) => {
                process.stdout.write(d);
                callbackFun != undefined || null ? callbackFun(d) : null;
            });
        });
    }
    postPutOrDeleteReq(options, data) {
        let postBody = JSON.stringify(data);
        const req = https.request(options, (res) => {
            console.log(`Your status-code is ${res.statusCode}`);
            console.log(`Your headers are ${JSON.stringify(res.headers)}`);
            res.on("data", (d) => {
                process.stdout.write(d);
            });
            res.on("end", () => {
                console.log(postBody);
            });
            req.on("error", (e) => {
                console.error(e);
            });
        });
        postBody ? req.write(postBody) : null;
        req.end();
    }
    runCommand(command, options) {
        const ls = (0, child_process_1.exec)(command, options, (error, stdout, stderr) => {
            error
                ? console.log(`This command ran into an error: ${error.message}`)
                : stderr
                    ? console.log(`The stderr was: ${stderr}`)
                    : console.log(`Stdout: ${stdout}`);
        });
    }
    hashIt(password) {
        const hash = crypto.createHash("sha256");
        let tempData;
        hash.on("readable", () => {
            const data = hash.read();
            if (data) {
                console.log(data.toString("hex"));
                tempData += data;
            }
        });
        hash.write(password);
        hash.end();
        return tempData;
    }
    verifyHash(password, hash) {
        let tempHash = this.hashIt(password);
        let verified;
        if (tempHash == this.hashIt(password)) {
            verified = true;
        }
        else {
            verified = false;
        }
        verified ? console.log(`Hash verified!`) : console.log("Failure to verify");
        return verified;
    }
    createPubandPrivKey(passPhrase, pubKeyStore, privKeyStore) {
        crypto.generateKeyPair("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "spki",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
                cipher: "aes-256-cbc",
                passphrase: passPhrase,
            },
        }, (err, publicKey, privateKey) => {
            err
                ? console.log("Failed to create a key pair")
                : console.log(`I am the public key ${publicKey},I am the private key${privateKey}`);
            this.write(pubKeyStore, publicKey);
            this.write(privKeyStore, privateKey);
        });
    }
}
exports.useNode = new Node();
//# sourceMappingURL=master.js.map