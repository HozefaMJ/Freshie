const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


// Body-Parser Middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

app.use(bodyParser.json())


// MongoDB Config
const db = require("./config/keys").mongoURI;

// MongoDB Middleware
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log('MongoDB Connected')).catch((err)=> console.log(err))


// The Only Route.
app.get("/", (req,res)=>{
    res.json({Jobs: "Coming Soon"})
})

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Jobs on Port ${port}`));