const express = require('express');
const { APP_PORT, DB_URL } = require('./config');
const routes= require('./routes/index');
const mongoose=require('mongoose')
const app =express();
const path= require('path')
const cors= require('cors');
app.use(cors());
mongoose.connect(DB_URL)

global.appRoot=path.resolve(__dirname);


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api',routes)

// when Url sees uploads in URL it will start serving data from uploads folder
app.use('/uploads',express.static('uploads'));


app.listen(APP_PORT,()=>{
    console.log(`Server is Listening on ${APP_PORT}`)
})