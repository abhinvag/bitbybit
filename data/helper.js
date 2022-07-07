const tuf = require('./tuf.json');
const fs = require('fs');

let obj = {}

let arr = tuf[0];

let res = [];

for(var i=1;i<=27;i++){
    var day = "Day " + i;
    for(var j=0;j<arr[day].length;j++){

        if(obj[arr[day][j].Link] === undefined) obj[arr[day][j].Link] = 1;
        else obj[arr[day][j].Link]++

        if(obj[arr[day][j].Link] > 1){
            //console.log(arr[day][j].Link);
        }
        else{
            res.push(arr[day][j]);
        }
    
    }
}

// fs.writeFile ("./tufQuestions.json", JSON.stringify(res), function(err) {
//     if (err) console.log(err);
//     else{
//         console.log('Done');
//     }
// });

console.log(res.length);

// console.log(obj);

