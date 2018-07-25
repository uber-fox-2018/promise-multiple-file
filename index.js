const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(parent_file, children_file) {
  // psst, the promise should be around here...
  return new Promise ((resolve, reject) => {
    fs.readFile(parent_file, 'utf8', (err, parentsData) => {
      if(err) {
        let obj = {
          err:err,
          msg: 'Terjadi error pada proses pembacaan data.'
        }
        reject(obj)
      } else {
        sleep.sleep(5)
        let parents = JSON.parse(parentsData)
        // console.log(parents);
        // resolve(parents)
        fs.readFile(children_file, 'utf8', (err, childrenData) => {
          if(err) {
            let obj = {
              err:err,
              msg: 'Terjadi error pada proses pembacaan data.'
            }
            reject(obj)
          } else {
            let childrens = JSON.parse(childrenData)
            for(let i = 0; i < parents.length; i++) {
              parents[i].childrens = []
              for(let j = 0; j < childrens.length; j++) {
                if(parents[i].last_name === childrens[j].family) {
                  parents[i].childrens.push(childrens[j].full_name)
                }
              }
            }
            resolve(parents);
          }
        })
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName, childrenFileName)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err.msg);
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');