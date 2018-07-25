const fs = require('fs');
//var sleep = require('sleep');
function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}


function readFilePromise(file) {
  return new Promise ((resolve,reject) => {
  	fs.readFile(file,(err,data) => {
  		if (err) {
  			reject(err)
      
      } else{
  			var data = JSON.parse(data)
  			resolve(data)
  		}
  	})
  })

}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
	readFilePromise(parentFileName) 
	.then(parent_data => {
		 return readFilePromise(childrenFileName)
		.then(children_data => {
      for (let i=0; i<parent_data.length; i++) {
        parent_data[i]["children"]= []

        for (var child of children_data) {
          if (parent_data[i]["last_name"]===child.family) {
            parent_data[i]["children"].push(child.full_name)
          }
        }
      }
      console.log (parent_data)
		})
	})
		
	.catch(err => {
		console.log(`Terjadi error pada proses pembacaan data...  ${err}`)
	})	
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');