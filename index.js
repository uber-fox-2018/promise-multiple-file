const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise ((resolve,reject) => {
    fs.readFile(file,(err,data) => {
      if (err) {
        reject(err)
      }else {
        let newData = JSON.parse(data)
        resolve(newData)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parent = null
  readFilePromise(parentFileName)
  .then((parent_data) => {
    parent = parent_data
    return new readFilePromise(childrenFileName)
  })
  .then((children_data) => {
    let children = children_data
    for (let i = 0; i < parent.length; i++) {
      let arr = parent[i].childrens = []
      for (let j = 0; j < children.length; j++) {
        if (parent[i].last_name === children[j].family) {
          arr.push(children[j].full_name)
        }
      }
    }
    console.log(parent);
  })
  .catch((err) => {
    if (err.errno == -2) {
      err = `terjadi error pada proses pembacaan data`
    }
    console.log(err);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
