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
  console.log("fetch LOAD from the brain")
  recController.loadRecAppDB(res)
})

app.post('/api/rec/delete', (req,res) => {
  console.log("fetch DELETE from the brain")
  console.log(req.body)
  recController.deleteRecAppDB(req.body)
})

app.post('/api/rec/updatefav', (req,res) => {
  console.log("fetch UPDATE FAV from the brain")
  console.log(req.body)
  recController.updateFavRecOnDB(req.body)
})


app.listen(3000, () => console.log("Server Up and running"));
// app.listen(process.env.PORT || 3000, () => console.log("Server Up and running"));
