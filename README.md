# Node Library

### This library is designed to be used with little to no knowledge of node.js. Simply import the constant useNode and access the methods using dot notation (Example:  ```useNode.method(parameters go here)```), and you're on your way to manipulating the file system without digging through documentation

However, if documentation is your life's blood. The methods used can be referenced in their more technical state here -> <https://nodejs.org/api/>

## Node Object


Import the useNode const using the 'import' method. 
 `import {useNode} from "./master";`

#### The file methods are asynchronous and non-blocking. The directory methods are synchronous and blocking. This was an intentional design choice, to prevent unexpected behavior with directories.

## Here are a list of methods this constant has access to

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

# Examples

### Write

#### This method takes in the filepath and the data (of any type) that you wish to write. If there is no file at that path, one will be created

`useNode.write("/folder/example.txt","Hello world")`

### Read

#### This method takes in the filepath and the data (of any type) that you wish to read. If there is no file at that path, the method will produce an error, which will be console.logged

`useNode.readFile("/folder/example.txt")`

### Append

#### This method takes in the filepath and the data (of any type) that you wish to append to the end of the targeted file. If there is no file at that path, one will be created

`useNode.append("/folder/example.txt","Hello world the sequel")`

### CheckFile

#### This method takes in the filepath. If the file does not exist or you do not have permission to access the file, an error will be logged

`useNode.checkFile("/folder/example.txt")`

### DeleteFile

#### This method takes in the filepath. If there is no file at that location an error will be logged

`useNode.deleteFile("/folder/example.txt")`

### MoveFile

#### This method takes in the 'old' or 'current' file path and a new filepath and moves it by 'renaming'

`useNode.moveFile("/folder/example.txt","/otherFolder/example.txt)`

### CopyFile

#### This method takes in the source file path and the destination file path and copies it into the new location

`useNode.copyFile("/sourceFolder/example.txt","/destinationFolder/example.txt")`

## Directory Methods

### MakeDir

#### This method takes in the 'shape' of a directory via string (Example: "/parent") and a boolean parameter 'multipleDirs'. If multipleDirs is true, then the method will recursively create directories to satisfy your string input. If multipleDirs is false, it will not

You want to first target the directory that the future children directories will branch off of. If not, the method will throw an error.

`useNode.makeDir("/parent/child1/child2/child3", true or false)`

### DeleteDir

#### This method takes a directory path, and the same multipleDirs boolean from Makedir. If makedirs is false, the only directory deleted will be the current one. If multipleDirs is true, the method will recursively delete every child directory

`useNode.deleteDir("/parent/child1/child2/child3", true or false)`

### MoveDir

#### This method takes in the 'old' path of the directory and a 'new' path. It moves the directory by renaming it

Directories: /parent1/sadChild ---- /parent2/

`useNode.moveDir("/parent1/sadChild", "/parent2/sadChild")`

Result --> /parent1 ----- /parent2/sadChild

### RenameDir

#### RenameDir takes in the same parameters and uses the same methods to move the directory. The only difference being that the returned location is the same

Directories: /parent1/sadChild

`useNode.renameDir("/parent1/sadChild", "/parent1/confusedChild")`

Result --> /parent1/confusedChild

### LoopOverDir

#### This method loops over a directory and fires a function for each file inside the directory depending on the description of the action. It takes in a directory path, the desired action, an optional new path, and an optional data parameter of any time

```useNode.loopOverDir(parameters below)```
```
loopOverDir(
   dirPath: string,
   action: "move" | "delete" | "append" | "read",
   newPath?: string,
   data?: any
 )
```

The action parameter specifies what of the four possible methods will be run on each file. If you are appending a file, then data must be filled in or the method will throw an error. If you are moving the files in the directory, then a new path value must be passed in.

### WatchFileOrDir

#### This method 'watches' a file or a directory, firing a function if the directory or file changes or is renamed based on the value of the 'watchFor' variable

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

#### The variable keepWatching is a boolean that defines if the file or directory will be tracked for the duration of your program or not. True, it is a persistent watch. On false, it is not. The watchFor variable defines if the function is fired during a file or directory rename or change in the content. This behavior varies depending on the browser or operating system. Testing for the desired behavior is recommended prior to use

## Url Methods

### GetSingleUrlParam

#### This method takes in the URL as a string and the desired parameter as a string. It returns the value from the parameter

```useNode.getSingleUrlParam(parameters below)```

```
getSingleUrlParam(grabbedURL: string, param: string) {
   const tempUrl = new URL(grabbedURL);
   const search_param = tempUrl.searchParams;
   return search_param.get(param);
 }
```

### GetUrlParameters

#### This method takes a url as a string and an array of strings for the desired parameters and returns an array of parameter values

`useNode.getUrlParameters(grabbedURL: string, params: string[]): string[]`

### GrabUrlParamsKeysAndValues

#### This method takes in a url as a string and returns an object of arrays, each containing the key and value pair for all parameters in a URL

`useNode.grabUrlParamsKeysAndValues(grabbedURL: string)`
