const fs = require('fs');
//var sleep = require('sleep');

function readFilePromise(fileName) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      setTimeout(() => {
        if (err)
          reject(err);
        else
          resolve(JSON.parse(data));
      }, 5000);
    })
  });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
    .then(parents => {
      return { parents: parents, childrenFilePromise: readFilePromise(childrenFileName) }
    })
    .then(data => {
      data.childrenFilePromise
        .then(children => {
          let parents = data.parents;
          parents.forEach(parent => {
            parent['children'] = [];
            children.forEach(child => {
              if (parent.last_name === child.family)
                parent.children.push(child.full_name);
            });
          });
          console.log(parents);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');