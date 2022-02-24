import {useNode} from "./master";
let dataToPost = {
	name:"jalen",
	job:"its friday bitches"
}
const options = {
	hostname: 'reqres.in',
	path: '/api/users',
	method: 'POST',
	header: {
		'Content-Type': 'application/json'
	}
}
useNode.postPutOrDeleteReq(options,dataToPost)
// useNode.getReq("https://httpbin.org/post")

