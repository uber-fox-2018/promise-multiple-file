const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(filename) {
  return new Promise((resolve, reject)=>{
    fs.readFile(filename, 'utf8', (err, data)=>{
        if(err){
            reject("Terjadi error pada proses pembacaan data")
        }else{
            let parseData = JSON.parse(data);
            resolve(parseData)
            sleep.sleep(5)
        }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let parentData = null;
  readFilePromise(parentFileName)
    .then(parents =>{
      parentData = parents
       return readFilePromise(childrenFileName)
    })
    .then(childrenData =>{
      for(let parent of parentData){
        parent.children = [];
        for(let child of childrenData){
          if(child.family === parent.last_name){
            parent.children.push(child.full_name);
          }
        }
      }
      console.log(parentData);
    })
    .catch(err =>{
      console.log(err);
    })
}
// matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');