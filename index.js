const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(filename) {
	// psst, the promise should be around here...
	return new Promise((resolve, reject) => {
		fs.readFile(filename, (err, data) => {
			if(err) {
				reject(err)
			} else {
				resolve(JSON.parse(data))
			}
		})
	});
}

// object.then

function matchParentsWithChildrens(parentFileName, childrenFileName) {
	// your code here... (p.s. readFilePromise function(s) should be around here..)
	let dataParent = null; // tampung dulu kata mbak icha biar bisa
	readFilePromise(parentFileName)
	.then((parents) => {
		dataParent = parents;
		let dataChildren = readFilePromise(childrenFileName)
		return dataChildren		//objectPromise
	})	
	.then((dataChildren) => {
		for(let i in dataParent) {
			dataParent[i].children = [];
			for(let j in dataChildren) {
				if(dataChildren[j].family == dataParent[i].last_name) {
					dataParent[i].children.push(dataChildren[j].full_name)
				}
			}
			console.log(dataParent);
		}
			
	})
	.catch((err) => {
		console.log(`file "${err.path}" ----> not found`);
	})
	
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');