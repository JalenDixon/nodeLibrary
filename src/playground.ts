import {Node} from "./master";

let playground = new Node()
playground.watchFileOrDir("../src/testdir/jalen1.txt",true,"file",addNum,"change")
function addNum(){
    return  1+1
}