const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./database/connection")
const notesrouter = require("./routes/notesRoutes");
const userrouter= require("./routes/userRoutes");


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


app.use("/api/notes",notesrouter);
app.use("/api/user",userrouter);
app.use("*",(req,res)=>{
    res.status(400).json({msg:"end point not found"});
})




const PORT  = process.env.PORT;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

connection(USERNAME,PASSWORD);
app.listen(PORT,()=> console.log(`Server is running at port number ${PORT}`));