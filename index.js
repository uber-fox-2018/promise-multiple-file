const fs = require('fs');
var sleep = require('sleep');
let parentsPath = `./parents.json`
let childrensPath = `./childrens.json`

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    console.log("Notification : Data sedang diproses !");
    fs.readFile(path,(err,data) => {
      if (err) reject(`Notification : Data tidak dapat diproses !`)
      else {
        let readableData = JSON.parse(data)
        sleep.sleep(5)
        resolve(readableData)
      }
    }) 
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parentsData;
  let childrensData;

  readFilePromise(parentsPath)
  .then( dataParents =>{
    parentsData = dataParents
    return readFilePromise(childrensPath)
  })
  .then( childrensData =>{
    try{
      for(let i = 0; i < parentsData.length; i++) {
        parentsData[i].children = []
        
        for (let j = 0; j < childrensData.length;j++) {
          if (parentsData[i].last_name === childrensData[j].family) {
            parentsData[i].children.push(childrensData[j].full_name)
          }
        }
      }
      console.log("Notification : Data sedang diproses !");
      sleep.sleep(5)
      console.log(parentsData)
    }catch(err){
      throw "Some error"
    }    
  })
  .catch( err => {
    console.log(err);
  })
}
matchParentsWithChildrens()



// matchParentsWithChildrens('./parents.json', './childrens.json');
// console.log("Notification : Data sedang diproses !");

// // for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');