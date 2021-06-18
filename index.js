// lib and imports
const express = require("express");
const app = express();

const recController = require("./controllers/controller")

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  res.render('home.ejs');
});


// Create here your api setup

app.post('/api/rec/add', (req, res) => {
  console.log('Hugh fetch ADD from the brain, req.body = ', req.body)
  recController.addRecAppDB(req.body)
})

app.post('/api/rec/load', (req,res) => {
  console.log("Hugh fetch LOAD from the brain")
  recController.loadRec(res)
})




app.listen(3000, () => console.log("Server Up and running"));
