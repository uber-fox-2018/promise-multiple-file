const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(namaFile) {
  
  // psst, the promise should be around here...
  return new Promise((resolve, reject) =>{
    let data = fs.readFileSync(namaFile)
    data = JSON.parse(data)
    if(typeof data[0] === typeof {}){
      resolve(data)
    }else{
      reject()
    } 
    
  })
}

// readFilePromise()

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(childrenFileName)
  .then(resolve =>{
    let childData = resolve
    readFilePromise(parentFileName)
      .then(resolve =>{
        let parentData = resolve
        return {childData,parentData}
      })
      .then(file =>{
        for(let i = 0 ; i < file.parentData.length ; i++){
          file.parentData[i].child = []
          for(let j = 0 ; j < file.childData.length ; j++){
            if(file.parentData[i].last_name === file.childData[j].family){
              file.parentData[i].child.push(file.childData[j].full_name)
            }
          }
          console.log(file.parentData[i]);
        }
      })
  })
  
  
  // your code here... (p.s. readFilePromise function(s) should be around here..)
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');