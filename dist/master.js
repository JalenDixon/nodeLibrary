"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNode = void 0;
var fs = require("node:fs");
var https = require("https");
// file system class
var Node = /** @class */ (function () {
    function Node() {
    }
    Node.prototype.write = function (filePath, data) {
        return fs.writeFile(filePath, data, function (err) {
            return err ? console.log(err) : console.log("File was created at ".concat(filePath));
        });
    };
    Node.prototype.append = function (filePath, data) {
        return fs.appendFile(filePath, data, function (err) {
            return err
                ? console.log(err)
                : console.log("Appended data to file at ".concat(filePath));
        });
    };
    Node.prototype.checkFile = function (filePath) {
        return fs.access(filePath, function (err) {
            return err
                ? console.log(err)
                : console.log("This file either doesnt exist or you're not allowed to view it, at ".concat(filePath));
        });
    };
    Node.prototype.deleteFile = function (filePath) {
        return fs.rm(filePath, function (err) {
            return err
                ? console.log("This file either doesnt exist or you're pointing in the wrong place")
                : console.log("File successfully removed");
        });
    };
    Node.prototype.moveFile = function (oldFilePath, newFilePath) {
        return fs.rename(oldFilePath, newFilePath, function (err) {
            return err
                ? console.log(err)
                : "File successfully moved from ".concat(oldFilePath, " to ").concat(newFilePath);
        });
    };
    Node.prototype.copyFile = function (sourcePath, destinationPath) {
        return fs.copyFile(sourcePath, destinationPath, function (err) {
            return err
                ? console.log(err)
                : "File successfully copied from ".concat(sourcePath, " to ").concat(destinationPath);
        });
    };
    Node.prototype.readFile = function (filePath) {
        return fs.readFile(filePath, function (err, data) {
            return err ? console.log(err) : data;
        });
    };
    Node.prototype.makeDir = function (directoryShape, multipleDirs) {
        return fs.mkdir(directoryShape, { recursive: multipleDirs }, function (err) {
            return err
                ? console.log(err)
                : "Directory with the shape of ".concat(directoryShape, " successfully created.");
        });
    };
    Node.prototype.deleteDir = function (dirPath, multipleDirs) {
        return fs.rmdir(dirPath, { recursive: multipleDirs }, function (err) {
            return err ? console.log(err) : "".concat(dirPath, " removed.");
        });
    };
    Node.prototype.renameDir = function (oldPath, newPath) {
        return fs.renameSync(oldPath, newPath);
    };
    Node.prototype.moveDir = function (oldPath, newPath) {
        return fs.renameSync(oldPath, newPath);
    };
    Node.prototype.getSingleUrlParam = function (grabbedURL, param) {
        var tempUrl = new URL(grabbedURL);
        var search_param = tempUrl.searchParams;
        return search_param.get(param);
    };
    Node.prototype.getUrlParameters = function (grabbedURL, params) {
        var tempURL = new URL(grabbedURL);
        var search_params = tempURL.searchParams;
        var i = 0;
        var finalReturnArray = [];
        params.forEach(grabParams);
        function grabParams() {
            var tempValue = search_params.get(params[i]);
            finalReturnArray.push(!tempValue ? "No value" : tempValue);
            i++;
        }
        return finalReturnArray;
    };
    Node.prototype.grabUrlParamsKeysAndValues = function (grabbedURL) {
        var tempURL = new URL(grabbedURL);
        return tempURL.searchParams.entries();
    };
    Node.prototype.loopOverDir = function (dirPath, action, newPath, data) {
        return fs.readdir(dirPath, function (err, files) {
            return err
                ? console.log("Failed to grab directory at ".concat(dirPath))
                : files.forEach(function (item) {
                    var tempNode = new Node();
                    var truePath = "".concat(dirPath, "/").concat(item);
                    action == "move"
                        ? tempNode.renameDir(truePath, newPath)
                        : action == "delete"
                            ? tempNode.deleteFile(truePath)
                            : action == "append"
                                ? tempNode.append(truePath, data)
                                : action == "read"
                                    ? tempNode.readFile(truePath)
                                    : null;
                });
        });
    };
    Node.prototype.watchFileOrDir = function (filePath, keepWatching, pathType, callBackFun, watchFor) {
        console.log("I am watching you");
        return fs.watch(filePath, { persistent: keepWatching, recursive: pathType == "dir" }, function (watchFor, filePath) {
            callBackFun();
            console.log("Your file or directory at ".concat(filePath, " has been changed."));
        });
    };
    Node.prototype.getReq = function (url, callbackFun) {
        https.get(url, function (res) {
            console.log("Your status-code is ".concat(res.statusCode));
            console.log("Your headers are ".concat(JSON.stringify(res.headers)));
            res.on('error', function (error) {
                console.error(error);
            })
                .on('data', function (d) {
                process.stdout.write(d);
                callbackFun != undefined || null ? callbackFun(d) : null;
            });
        });
    };
    Node.prototype.postPutOrDeleteReq = function (options, data) {
        var postBody = JSON.stringify(data);
        var req = https.request(options, function (res) {
            console.log("Your status-code is ".concat(res.statusCode));
            console.log("Your headers are ".concat(JSON.stringify(res.headers)));
            res.on('data', function (d) {
                process.stdout.write(d);
            });
            res.on('end', function () {
                console.log(postBody);
            });
            req.on('error', function (e) {
                console.error(e);
            });
        });
        postBody ? req.write(postBody) : null;
        req.end();
    };
    return Node;
}());
exports.useNode = new Node();
//# sourceMappingURL=master.js.map