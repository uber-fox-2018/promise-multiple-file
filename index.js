const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(parentFileName, childrenFileName) {
  // psst, the promise should be around here...
  let promise = new Promise(function(resolve,reject){
    fs.readFile(parentFileName,'utf8',function(err,data){
      if(err){
        reject(err)
      }else{
        var dataParent = JSON.parse(data)
        fs.readFile(childrenFileName,'utf8',function(err,data){
          if(err){
            reject(err)
          }else{
            var dataChildren = JSON.parse(data)
            for(var i = 0; i < dataParent.length;i++){
              dataParent[i].childrens = []
              for(var j = 0; j < dataChildren.length;j++){
                if(dataChildren[j].family === dataParent[i].last_name){
                  dataParent[i].childrens.push(dataChildren[j].full_name)
                }
              }
            }
            resolve(dataParent)
          }
        })
        
      }
    })
  })

  return promise

}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)

  readFilePromise(parentFileName,childrenFileName)
  .then((dataParent)=>{
    // console.log(dataParent);
    for(var i = 0; i < dataParent.length;i++){
      console.log(dataParent[i]);
      sleep.sleep(1)
    }
    
  })

  .catch((err)=>{
    console.log(err);
    
  })
  
  

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');