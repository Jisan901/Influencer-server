const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// default app configuration
const app = express();
const PORT = process.env.PORT||5000;

app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('server running');
})

// mongoose connection 

mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log('DB connected');
})
.catch((error)=>{
    console.log(error.message)
})

// all api 

app.use("/api/v1/user",require('./Api/users.js'))
app.use("/api/v1/product",require('./Api/products.js'))


// 

app.all("*", (req, res) => {
  res.status(404).send({ message:"route doesn't exist"});
});


app.listen(PORT,()=>{
    console.log('server started on',PORT);
})

// handling error and close server

// process.on("uncaughtException", (err) => {
//   app.close(() => {
//     process.exit(1);
//   });
// });
