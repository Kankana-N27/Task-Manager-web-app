// const express=require("express");// Import the Express framework
// const app=express();// Create an instance of the Express app
// const mongoose=require("mongoose"); // Import Mongoose to interact with MongoDB
// const path=require("path");
// const Task=require("./list.js")
// const methodOverride=require("method-override");


// app.set("views",path.join(__dirname,"views"));
// app.set("view engine","ejs");
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname,"public")))
// app.use(methodOverride("_method"));


// main().then(()=>{
//     console.log("connection is sucessfull");
    
//     }).catch(err => console.log(err));
    
//     async function main() {
//       await mongoose.connect('mongodb://127.0.0.1:27017/List');
//     }

//     // let list1=new Task({
//     //     task:"CSS",
//     //     Description:"Basic concept of CSS"
//     // })
//     // list1.save().then((res)=>{
//     //     console.log(res);      
//     // }).catch((err)=>{
//     //     console.log(err);
        
//     // })
//     app.get("/",async(req,res)=>{
//         const tasks = await Task.find();
//         console.log(tasks);
//         res.render("home.ejs",{tasks})
//     })
//     app.post("/",(req,res)=>{
//         let {task,Description}=req.body;
//         let lists=new Task({
//             task:task,
//             Description:Description
//         })
//         lists.save().then((res)=>{
//                 console.log("saved");      
//             }).catch((err)=>{
//                 console.log(err);
                
//             })
//             console.log(lists);
//             res.redirect("/");
//     })

//     //EDIT---
//     app.get("/:id/edit",async(req,res)=>{
//         let {id}=req.params;
//         const t=await Task.findById(id);
//         res.render("edit.ejs",{t});
//     })
//     app.put("/:id",async(req,res)=>{
//         let {id}=req.params;
//         let{task,Description}=req.body;
//         let updateTask=await Task.findByIdAndUpdate(id,{task:task,Description:Description},{runValidators:true, new:true})
//         console.log(updateTask);
//   res.redirect("/")
//     })
// app.delete("/:id",async(req,res)=>{
// let {id}=req.params;
// let deleteTask=await Task.findByIdAndDelete(id);
// console.log(deleteTask.task);
// res.redirect("/");

// })

// app.listen(8080,()=>{
//     console.log("listening port:8080");
    
// })

require('dotenv').config(); // Load environment variables

const express = require("express"); // Import the Express framework
const app = express(); // Create an instance of the Express app
const mongoose = require("mongoose"); // Import Mongoose to interact with MongoDB
const path = require("path");
const Task = require("./list.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Connection is successful");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI); // Use Mongo URI from .env
}

// Routes

app.get("/", async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.render("home.ejs", { tasks });
});

app.post("/", (req, res) => {
  let { task, Description } = req.body;
  let lists = new Task({
    task: task,
    Description: Description
  });

  lists.save()
    .then((res) => {
      console.log("Saved");
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(lists);
  res.redirect("/");
});

// EDIT
app.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const t = await Task.findById(id);
  res.render("edit.ejs", { t });
});

app.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { task, Description } = req.body;
  let updateTask = await Task.findByIdAndUpdate(id, { task: task, Description: Description }, { runValidators: true, new: true });
  console.log(updateTask);
  res.redirect("/");
});

app.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let deleteTask = await Task.findByIdAndDelete(id);
  console.log(deleteTask.task);
  res.redirect("/");
});

// Use PORT from .env or fallback to 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
