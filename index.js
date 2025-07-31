
const express = require('express')
const fs = require('fs')
const app = express()
app.set('view engine', 'ejs')


let storeData = []
let editId = null


let readData = fs.readFileSync('index1.json', 'utf-8')
//  console.log(readData);

if (readData != '') {
    storeData = JSON.parse(readData)
    //console.log("storeData ==> ",storeData);  
}
 
app.get("/", (req, res) => {
    res.render('data', { storeData, editData: null })

})

app.get("/createData", (req, res) => {
    // console.log("check");

    const data = req.query

    //console.log(req.query);
    // console.log(data);
    // console.log(JSON.stringify(data));

    if (editId != null) {
        storeData[editId] = data
        editId = null
    }
    else {

        storeData.push(data)
    }

    fs.writeFileSync('index1.json', JSON.stringify(storeData))
    res.redirect("/")
})
app.get("/deleteData/:deleteId", (req, res) => {
    const deleteId = req.params.deleteId
    console.log(deleteId);
    storeData.splice(deleteId, 1)
    fs.writeFileSync('index1.json', JSON.stringify(storeData))
    res.redirect('/')
}) 

app.get("/editData", (req, res) => {
    console.log('hello');
    editId = req.query.editId
    console.log(req.query.editId);
    const editData = storeData[editId]
    console.log(editData);
    res.render('data', { editData, storeData })
})

app.listen(3002)
