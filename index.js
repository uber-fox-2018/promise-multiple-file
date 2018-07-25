const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(data_file) {
  return new Promise((resolve, reject) => {
    fs.readFile(data_file, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let dataFileParent = readFilePromise(parentFileName)
  let dataFileChildren = readFilePromise(childrenFileName)
  Promise.all([dataFileParent, dataFileChildren])
  .then(dataAll => {
    let dataParent = dataAll[0]
    let dataChildren = dataAll[1]

    dataParent.map((parent, i) => {
      var childWithParent = []
      dataChildren.map(child => {
        if (parent.last_name === child.family) {
          childWithParent.push(child.full_name)
        }
      })
      dataParent[i].children = childWithParent
    })

    sleep.sleep(5)
    console.log(dataParent)
  })
  .catch(err => {
    console.log(err)
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');