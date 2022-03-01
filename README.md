<div align="center"><img height="200px" width="200px" src="./src/resources/nodejs-png-nodejs-icon-png-50-px-1600.png" alt="node.js">
</div>

# Node & Microsoft Library

This library is designed to be used with little to no knowledge of node.js. Simply import the constant useNode and
access the methods using dot notation.<br>

Example:
```useNode.method(parameters go here)```
<br><br> Just like that, you're on your way to manipulating the file system without digging through complex
documentation

#### However, if documentation is your life's blood. The methods used can be referenced in their more technical state here -> <https://nodejs.org/api/>

## Node Object

Import the useNode const using the 'import' method.<br>

```
import {useNode} from "./master"
```

<b>Most of the file methods (except readFile) are asynchronous and non-blocking. The directory methods are synchronous
and blocking. This was an intentional design choice, to prevent unexpected behavior with directories.</b>

## Here are a list of methods this constant has access to:

- Write
- ReadFile
- Append
- CheckFile
- DeleteFile
- MoveFile
- CopyFile
- MakeDir
- DeleteDir
- RenameDir
- MoveDir
- LoopOverDir
- WatchFileOrDir
- GetSingleUrlParam
- GetUrlParameters
- GrabUrlParamsKeysAndValues
- GetReq
- PostPutOrDeleteReq
- HashIt
- VerifyHash
- CreatePubAndPrivKey
- RunCommand

# Examples

### Write

#### This method takes in the filepath and the data (of any type) that you wish to write. If there is no file at that path, one will be created.

```
useNode.write("/folder/example.txt","Hello world")
```

### Read

#### This method takes in the filepath and the data (of any type) that you wish to read. If there is no file at that path, the method will produce an error, which will be console.logged. This method is blocking, which means once this method runs, it *

will* finish before the rest of the code is executed.

```
useNode.readFile("/folder/example.txt")
```

### Append

#### This method takes in the filepath and the data (of any type) that you wish to append to the end of the targeted file. If there is no file at that path, one will be created.

```
useNode.append("/folder/example.txt","Hello world the sequel")
```

### CheckFile

#### This method takes in the filepath. If the file does not exist or you do not have permission to access the file, an error will be logged.

```
useNode.checkFile("/folder/example.txt")
```

### DeleteFile

#### This method takes in the filepath. If there is no file at that location an error will be logged.

```
useNode.deleteFile("/folder/example.txt")
```

### MoveFile

#### This method takes in the 'old' or 'current' file path and a new filepath and moves it by 'renaming'.

```
useNode.moveFile("/folder/example.txt","/otherFolder/example.txt)
```

### CopyFile

#### This method takes in the source file path and the destination file path and copies it into the new location.

```
useNode.copyFile("/sourceFolder/example.txt","/destinationFolder/example.txt")
```

## Directory Methods

### MakeDir

#### This method takes in the 'shape' of a directory via string (Example: "/parent") and a boolean parameter 'multipleDirs'. If multipleDirs is true, then the method will recursively create directories to satisfy your string input. If multipleDirs is false, it will not.

You want to first target the directory that the future children directories will branch off of. If not, the method will
throw an error.

```
useNode.makeDir("/parent/child1/child2/child3", true or false)
```

### DeleteDir

#### This method takes a directory path, and the same multipleDirs boolean from Makedir. If makedirs is false, the only directory deleted will be the current one. If multipleDirs is true, the method will recursively delete every child directory.

```
useNode.deleteDir("/parent/child1/child2/child3", true or false)
```

### MoveDir

#### This method takes in the 'old' path of the directory and a 'new' path. It moves the directory by renaming it.

Directories: /parent1/sadChild ---- /parent2/

```
useNode.moveDir("/parent1/sadChild", "/parent2/sadChild")
```

Result --> /parent1 ----- /parent2/sadChild

### RenameDir

#### RenameDir takes in the same parameters and uses the same methods to move the directory. The only difference being that the returned location is the same.

Directories: /parent1/sadChild

```
useNode.renameDir("/parent1/sadChild", "/parent1/confusedChild")
```

Result --> /parent1/confusedChild

### LoopOverDir

#### This method loops over a directory and fires a function for each file inside the directory depending on the description of the action. It takes in a directory path, the desired action, an optional new path, and an optional data parameter of any type.

```useNode.loopOverDir(parameters below)```

```
loopOverDir(
   dirPath: string,
   action: "move" | "delete" | "append" | "read",
   newPath?: string,
   data?: any
 )
```

The action parameter specifies what of the four possible methods will be run on each file. If you are appending a file,
then data must be filled in or the method will throw an error. If you are moving the files in the directory, then a new
path value must be passed in.

### WatchFileOrDir

#### This method 'watches' a file or a directory, firing a function if the directory or file changes or is renamed based on the value of the 'watchFor' variable.

```useNode.watchFileOrDir(parameters below)```

```
watchFileOrDir(
   filePath: string,
   keepWatching: boolean,
   pathType: "dir" | "file",
   callBackFun: Function,
   watchFor: "rename" | "change"
 )
```

#### The variable keepWatching is a boolean that defines if the file or directory will be tracked for the duration of your program or not. True, it is a persistent watch. On false, it is not. The watchFor variable defines if the function is fired during a file or directory rename or change in the content. This behavior varies depending on the browser or operating system. Testing for the desired behavior is recommended prior to use.

## Url Methods

### For practicing the below url methods, I utilized the website --> <https://reqres.in/>

### GetSingleUrlParam

#### This method takes in the URL as a string and the desired parameter as a string. It returns the value from the parameter.

```useNode.getSingleUrlParam(parameters below)```

```
getSingleUrlParam(grabbedURL: string, param: string) {
   const tempUrl = new URL(grabbedURL);
   const search_param = tempUrl.searchParams;
   return search_param.get(param);
 }
```

### GetUrlParameters

#### This method takes a url as a string and an array of strings for the desired parameters and returns an array of parameter values.

```
useNode.getUrlParameters(grabbedURL: string, params: string[]): string[]
```

### GrabUrlParamsKeysAndValues

#### This method takes in a url as a string and returns an object of arrays, each containing the key and value pair for all parameters in a URL.

```
useNode.grabUrlParamsKeysAndValues(grabbedURL: string)
```

### Get Request

#### This method executes a get request to a URL and then fires an optional function with the data retrieved.

```
useNode.getReq("your URL here",callBackFunction
```

<div align="center">or</div>

```
useNode.getReq("your URL here")
```

### PostPutOrDeleteReq

#### This method takes in two parameters: an object that <u>must</u> be created, and an optional data parameter in the shape of an object. The first object contains the properties that node will parse through during its https operations. The second object will be stringified automatically.

#### The first object is shaped as so:

```
const options = { hostname: 'the base url', path: 'the endpoint desired', method: 'the method you want to utilize', header: {
'Content-Type': 'the type of data, i.e json' } }
```

#### Example of the first parameter:

```
const options = { hostname: 'reqres.in', path: '/api/users', method: 'POST', header: {
'Content-Type': 'application/json' } }
```

Example of the method:

```
useNode.postPutOrDeleteReq(options,dataToPost)
```

## Crypto Methods

### Hash It

#### This method takes in a string as your 'password', or other data that you want stored in a cryptologic fashion and hashes it.

#### *Note* Once data is hashed it <u>Cannot be unhashed or returned to its original string</u>.

```
useNode.hashIt('your string here')
```

### Verify Hash

#### This method takes the string which in most cases would be the password and the hash that you're comparing it to. If the string, once hashed, matches the hash that is the second parameter the method returns true.

```
useNode.verifyHash('string','hash youre comparing')
```

### Create Public And Private Key

#### This method creates a public and private key. It takes in a passphrase, the location you wish to store your public key, and the location you wish to store your private key. <u>The location must have a filename in the path, as the method locates the directory you wish to place it in and then assigns a filename. No default filename is given.</u> <br><br>

#### Example: ```"/src/keyFolder/pubKeyExample"```

```aidl
useNode.createPubandPrivKey("example password","/src/keyFolder/publicKey","/src/keyFolder/privateKey")
```

## Shell Methods

### Run Command

#### This method utilizes the default shell of the operating system. It is used to run batch files or command files. It takes in the command as a string, and an optional "options" object. It also takes in an optional callback function that will run at the end of the file executing. Below is an example of some options one might find useful. Deeper documentation can be found on --> <https://nodejs.org/api/child_process.html>

#### Options:

* cwd : current working directory
* signal: abort signal
* timeout: time to wait before running file
* uid: sets the identity of the process
* windowsHide: Default is false, if true- it hides the windows' console that would typically pop up.

#### Example of options object:

```aidl
{ cwd:"src", windowsHide:true, uid: 1, timeout:1500, signal:event }
``` 

#### Example of the method:<br>

```aidl
runCommand("ls -la", {windowsHide:true},yourFunction)
```

## Microsoft Methods

### Quick note on parameter names and what they mean: <br><br>

For the parameters, whenever <u>Path</u> is mentioned, it is mentioned as a string with the ending slash. <br><br>
For example: <br><br>  This is correct -->   ```'../src/resources/'``` <br><br> This is not
--> ```'../src/resources'``` <br> <br> Whenever <u>name</u> is mentioned:<br><br> This is
correct-->```'myexcel' or 'myjson'``` <br><br> This is not --> ```'myexcel.xlsx or 'myjson.json'```
<br>

#### The reason for this, is because in the function I add the filename extensions myself. I did not add the slashes to make it more clear that you are specifying the path of the <u>Directory</u> and not the absolute path of the item. <br><br>

#### Utilize the same import method as you did for useNode.

```aidl
import useMicrosoft from './src/microsoft.ts'
```

#### Below are a list of usable methods, utilizing code from the sheet.js repo. --> <https://github.com/SheetJS/sheetjs> For more detailed documentation please see that repository.

- readSheets
- readSingleSheet
- makeEmptyExcel
- createExcelFromJson
- appendIntoExcel
- editCell
- getCell
- getColumn
- getRow

### Read Sheets

#### This method returns an array of objects of Excel sheets. It takes in the path, the name of the Excel document, and a boolean. If true, this boolean console.logs the resulting array of objects.

```aidl
readSheets(path: string, excelName: string, showResult: boolean): {}[]
```

### Read Single Sheet

#### This method returns an array of objects for a specified sheet.It takes in the path, the name of the Excel document, and a boolean. If true, this boolean console.logs the result.

```aidl
readSingleSheet(
		path: string,
		excelName: string,
		sheetName?: string,
		showResult?: boolean
	) 
```

### Make Empty Excel

#### This method takes in the path you wish to save your Excel to and the name of the Excel.

```aidl
makeEmptyExcel(path: string, excelName: string)
```

### Create Excel From Json

#### This method takes in the path of the json you wish to read, the name of the json, the path you wish to same your json to, the name of the Excel, and the parentObject of the json.

##### The shape of the JSON <u>must</u> be like so:

```aidl
{
    'parentObject':
        {
            Attribute1:'Attribute string',
            Attribute2:'Attribute2 string'
        },
        
        ...
}
```

<br>

```aidl
   createExcelFromJson(jsonPath: string, jsonName: string, excelPath: string, excelName: string, parentAttribute: string)
```

### Append into Excel

#### This method appends a row to the bottom of an Excel. It takes in the path of the Excel, the name of the Excel, the data you wish to add in either parsed object or string, and an optional sheetname parameter. If nothing is specified for sheet name, the default will be the Excel name.

```aidl
appendIntoExcel(excelPath: string, excelName: string, data: Object | string, sheetName?: string)
```

### Edit cell

#### This method edits a specific cell based on the 'action' you provide it. It takes in the path of the Excel, the name of the Excel, the cell address, the value as a string that you wish to replace it with, the action you want to execute, and an optional sheetName. If no value is provided for sheet name it will default to the Excel name. The method logs what the cell was prior to the edit and what it is after the edit.

```aidl
editCell(excelPath: string, excelName: string, cellAddress: string, replacement: string | number, action: 'append' | 'delete' | 'replace', sheetName?: string)
```

### Get Cell

#### This method returns the cell you designate based off of a search value. It is highly recommended that you search using a unique value. It takes in the excelPath, the name of the Excel, the search value as a string, number, or boolean, and an optional sheetname. If no sheetname is provided the method will default to the Excel name.

```aidl
getCell(excelPath: string, excelName: string, searchValue: string | number | boolean, sheetName?: string)
```

### Get Column & Get Row

#### These methods return an array of objects containing every value in the designated column or row. They take in the path of the Excel, the name of the Excel, the desired columb as a string, and an optional sheetname parameter. If no sheetname is provided the method will default to the Excel name.

```aidl
getColumn(excelPath: string, excelName: string, searchColumn: string, sheetName?: string)

getRow(excelPath: string, excelName: string, cellValue: string | number | boolean, sheetName?: string)
```