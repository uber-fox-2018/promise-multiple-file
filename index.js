const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(path) {
  return new Promise ((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject (err);
      } else {
        resolve (JSON.parse(data));
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
  .then((parents) => {
    console.log('data parent sedang diproses...');
    sleep.sleep(5);
    return readFilePromise(childrenFileName)
    .then((children) => {
      console.log('data children sedang diproses...');
      sleep.sleep(5);
      parents.forEach((parent) => {
        let childrenArr = children.filter((child) => {
          return child.family == parent.last_name;
        })
        parent.children = childrenArr;
        console.log(parent);
      })
    })
  })
  .catch((err)=>{
    console.log(err.message)
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');