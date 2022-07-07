//const fs = require('fs');
// let Question = require("../models/question.model");
// const connectDB = require("../config/db");
// const tufQuestions =  require('./tufQuestions.json');

// var res = {};

// res.Array = [];
// res.Matrix = [];
// res.String = [];
// res.SearchingAndSorting = [];
// res.LinkedList = [];
// res.BinaryTrees = [];
// res.BinarySearchTrees = [];
// res.Greedy = [];
// res.BackTracking = [];
// res.StacksAndQueues = [];
// res.Heap = [];
// res.Graph = [];
// res.Trie = [];
// res.DynamicProgramming = [];
// res.BitManipulation = [];

// for(var i=0;i<data.length;i++){
//     for(var j=0; j<dbquestions.length;j++){
//         if(data[i].Link === dbquestions[j].link[0].link){
//             data[i].id = dbquestions[j].id;
//             break;
//         }
//     }
// }

// for(var i=0;i<data.length;i++){
//     if(data[i].Topic === "Array"){
//         res.Array.push(data[i]);
//     }
//     else if(data[i].Topic === "Matrix"){
//         res.Matrix.push(data[i]);
//     }
//     else if(data[i].Topic === "String"){
//         res.String.push(data[i]);
//     }
//     else if(data[i].Topic === "Searching & Sorting"){
//         res.SearchingAndSorting.push(data[i]);
//     }
//     else if(data[i].Topic === "LinkedList"){
//         res.LinkedList.push(data[i]);
//     }
//     else if(data[i].Topic === "Binary Trees"){
//         res.BinaryTrees.push(data[i]);
//     }
//     else if(data[i].Topic === "Binary Search Trees"){
//         res.BinarySearchTrees.push(data[i]);
//     }
//     else if(data[i].Topic === "Greedy"){
//         res.Greedy.push(data[i]);
//     }
//     else if(data[i].Topic === "BackTracking"){
//         res.BackTracking.push(data[i]);
//     }
//     else if(data[i].Topic === "Stacks & Queues"){
//         res.StacksAndQueues.push(data[i]);
//     }
//     else if(data[i].Topic === "Heap"){
//         res.Heap.push(data[i]);
//     }
//     else if(data[i].Topic === "Graph"){
//         res.Graph.push(data[i]);
//     }
//     else if(data[i].Topic === "Trie"){
//         res.Trie.push(data[i]);
//     }
//     else if(data[i].Topic === "Dynamic Programming"){
//         res.DynamicProgramming.push(data[i]);
//     }
//     else if(data[i].Topic === "Bit Manipulation"){
//         res.BitManipulation.push(data[i]);
//     }
// }

// fs.writeFile ("./data/450.json", JSON.stringify(res), function(err) {
//     if (err) throw err;
//         console.log('Done');
//     }
// );

let Question = require("./models/question.model");
const connectDB = require("./config/db");
const tufQuestions =  require('./data/tufQuestions.json');
const tuf = require('./data/tuf.json');
const fs = require('fs');

const applyIds = async () => {

    try{

        await connectDB();

        let arr = tuf[0];

        let promises = [];

        for(var i=1;i<=27;i++){
            var day = "Day " + i;
            for(var j=0;j<arr[day].length;j++){

                //console.log(arr[day][j]);

                promises.push(Question.findOne({"link": arr[day][j].Link}));

            }
        }

        const res =  await Promise.all(promises);

        for(var i=1;i<=27;i++){
            var day = "Day " + i;
            for(var j=0;j<arr[day].length;j++){

                for(var k=0;k<res.length;k++){
                    if(res[k].link == arr[day][j].Link){
                        arr[day][j].id = res[k]._id;
                        break;
                    }
                }

            }
        }

        fs.writeFile ("./tuf.json", JSON.stringify(arr), function(err) {
            if (err) console.log(err);
            else{
                console.log('Done');
            }
        });

    }catch(err){
        console.log(err);
    }

    
}


const insertDataIntoDb = async() => {

    try{

        await connectDB();

        let promises = [];

        for(var i=0;i<tufQuestions.length;i++){

            const newQuestion = new Question({
                name: tufQuestions[i].Name,
                link: tufQuestions[i].Link
            })
        
            promises.push(Question.insertMany(newQuestion));
        
        }

        await Promise.all(promises); 
    
        process.exit();
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
    
}

applyIds();




