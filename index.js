const fs = require("fs");
// var sleep = require('sleep');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

function readFilePromise(JSONfile) {
  // psst, the promise should be around here...
  return new Promise(function(resolve, reject) {
    fs.readFile(JSONfile, function(err, data) {
      if (err) {
        reject(err.message);
      } else {
        let arr = data;
        resolve(JSON.parse(arr));
        sleep(3000);
      }
    });
  });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName).then(function(parentsData) {
    return readFilePromise(childrenFileName)
      .then(function(childrensData) {
        parentsData.forEach(p_Search => {
          p_Search.childrensData = [];
          childrensData.forEach(c_Search => {
            if (p_Search.last_name === c_Search.family) {
              p_Search.childrensData.push(c_Search.full_name);
            }
          });
          console.log(p_Search);
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
}

matchParentsWithChildrens("./parents.json", "./childrens.json");
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens("/parents.json", "/not_childrens.json");
// matchParentsWithChildrens("/not_parents.json", "/not_childrens.json");