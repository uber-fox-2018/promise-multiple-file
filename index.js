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

function matchParentsWithChildrens(parentFileName, childrenFileName) {
	// your code here... (p.s. readFilePromise function(s) should be around here..)
	readFilePromise(parentFileName)
		.then((dataParent) => {
			// console.log(dataParent)
			readFilePromise(childrenFileName)
				.then((dataChild) => {

					for(let i in dataParent) {
						dataParent[i].children = [];
						for(let j in dataChild) {
							if(dataChild[j].family == dataParent[i].last_name) {
								dataParent[i].children.push(dataChild[j].full_name)
							}
							// console.log(dataChild[j])
						}
						console.log(dataParent[i])
					}
					
				})
				.catch((err) => {
					console.log('file child not found')
				})
		})
		.catch((err) => {
			console.log("file parent not found")
		})
	
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');