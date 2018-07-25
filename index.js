const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8',function (err, data) {
      if (err) {
        reject(err)
      }
      let dataParse = JSON.parse(data)
        resolve(dataParse)
      try{
      }
      catch(err){
        reject(err)
      }
    })
  })
  // psst, the promise should be around here...
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let dataParent = null;
  readFilePromise(parentFileName)
    .then((dataParents) => {
      dataParent = dataParents
      return readFilePromise(childrenFileName)
    })
    .then((dataChildren) => {
      for (let i = 0; i < dataParent.length; i++) {
        dataParent[i].childrens = []
        for (let j = 0; j < dataChildren.length; j++) {
          if (dataParent[i].last_name === dataChildren[j].family) {
            dataParent[i].childrens.push(dataChildren[j].full_name)
          }
        }
      }
      sleep.sleep(3)
      console.log(dataParent)
    })
    .catch((err) => {
      console.log(err)
    })
  // your code here... (p.s. readFilePromise function(s) should be around here..)
}



matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// // for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');