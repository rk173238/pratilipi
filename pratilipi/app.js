const express = require('express')
const bodyParser = require('body-parser');
const api = express()
const cors = require('cors')

api.use(cors())
api.use(bodyParser.urlencoded({ extended: true }));

let matrix=[[-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1]]
let user={}
var yellow=true;
api.get('/start', (req, res) => {
    resetMatrix();
    res.send('READY Token:'+setUser())
})
api.get('/user', (req, res) => {

    //search for the user in the database and return latest game activities;
    console.log('to be done')
    res.send("Work In Progress")
})

api.post('/set', (req, res) => {
    var j=parseInt(req.body.col)
    if(matrix[0][j]!==0){
        res.send('Invalid')
    }else{
        var i=5;
        for(;i>=0;i--){
            if(matrix[i][j]===0){
                break;
            }
        }
        var redWin=false,yellowWin=false;
        console.log(i," ",j,yellow);
        // console.log(req.headers)
        if(yellow){
            matrix[i][j]=1;
            yellowWin=checkWin(1);
        }else{
            matrix[i][j]=2;
            redWin=checkWin(2);
        }
        if(redWin===true){
            resetMatrix()
            res.send("Red wins"); 
        }
        else if(yellowWin===true){
            resetMatrix()
            res.send("Yellow wins")
        }
        else{
            yellow=!yellow;
            printmatrix();
            res.send("Valid");
        }
    }
})
function resetMatrix(){
    yellow=true;
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            matrix[i][j]=0;
        }
    }
    printmatrix();
}
function setUser(){
    var token=getUniqueToken();
    user[token]=[];
    return token;
}
function resetVis(){
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            vis[i][j]=0;
        }
    }
}
function printmatrix(){
    for(var i=0;i<6;i++){
        var s="";
        for(var j=0;j<7;j++) s+=' '+matrix[i][j];
        console.log(s)
    }
}
function checkWin(id){
    //col check
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            var c=0;
            for(var k=0;i+k<6;k++)
                if(matrix[i+ k][j]===id) c++;
                else break;
            if(c>=4) return true;
        }
    }
    // row check
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            var c=0;
            for(var k=0;k<4&&j+k<7;k++) 
                if(matrix[i][j+k]===id) c++;
                else break;
            if(c>=4) return true;
        }
    }
    // Diag check
    for(var i=0;i<6;i++){
        for(var j=0;j<4;j++){
            var c=0;
            for(var k=0;k<4&&i+k<6&&j+k<7;k++) 
                if(matrix[i+k][j+k]===id) c++;
            if(c>=4) return true;
        }
    }
    for(var i=0;i<6;i++){
        for(var j=0;j<4;j++){
            var c=0;
            for(var k=0;k<4&&i+k<6&&j-k>=0;k++) 
                if(matrix[i+k][j-k]===id) c++;
            if(c>=4) return true;
        }
    }
    return false;
}

//recursive functions to check winning
function checkRow(i,j,cost,id){
    if(j<0||j>6) return false;
    if(matrix[i][j]!==id) return false;
    if(cost>=4) return true;
    if(vis[i][j]===1) return false;
    return checkRow(i,j+1,cost+1,id)||checkRow(i,j-1,cost+1,id);
}
function checkCol(i,j,cost,id){
    if(i<0||i>5) return false;
    if(matrix[i][j]!==id) return false;
    if(cost>=4) return true;
    if(vis[i][j]===1) return false;
    return checkCol(i-1,j,cost+1,id)||checkCol(i+1,j,cost+1,id);
}
function getUniqueToken()
{
    let d=new Date();
    return d
}
// api.listen(3000, () => {
//   console.log(`Listening at :3000`)
// })
api.listen(process.env.PORT || 3000, () => console.log("listining...."));