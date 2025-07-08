const express = require('express')
const fs = require("fs")
const app = express()
app.set("view engine", "ejs")


let storeData = []

let readData = fs.readFileSync('index1.json', 'utf-8')
//  console.log(readData);

if (readData != '') {
    storeData = JSON.parse(readData)
    //console.log("storeData ==> ",storeData);  
}


app.get("/", (req, res) => {
    res.render('data', { storeData })

})

app.get("/createData", (req, res) => {
    // console.log("check");

    const data = req.query

    //console.log(req.query);
    // console.log(data);
    // console.log(JSON.stringify(data));

    storeData.push(data)
    fs.writeFileSync('index1.json', JSON.stringify(storeData))


    res.redirect("/")


})


app.listen(3002)