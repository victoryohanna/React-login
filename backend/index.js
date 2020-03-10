
// //get dependencies
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;   

const url = 'mongodb://localhost:27017/register';
const app = express();      

//ESTABLISH CONNECTION TO THE DATABASE
    mongoose.connect(url, { useNewUrlParser: true}).then(()=>{
            console.log("SUCCESSFULY CONNECTED TO THE DATABASE");
        }).catch(err=>{
            console.log("FAIL TO CONNECT TO THE DATABASE");
            process.exit();
     });  
/*-------------------------------------------------------------*/

// perse request 
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
     
//enable cors for all http header
app.use(cors());

const api = require('./routes/api');
app.use('/', api);

app.listen(port, ()=>console.log("Server start at port " + port));