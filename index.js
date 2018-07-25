const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  // psst, the promise should be around here...
  return new Promise ((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (!err) {
        sleep.sleep(3);
        resolve(JSON.parse(data));
      } else {
        reject(err);
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parents = null;
  readFilePromise(parentFileName)
  .then((parentData) => {
    parents = parentData
    return readFilePromise(childrenFileName)
  })
  .then(childrenData => {
    console.log(parents, childrenData);
  })
  .catch(err => {
    console.log(err)
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// // for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');