// implement your API here
//import express from 'express'; // ES2015 module import
const express = require('express'); //Common JS module import
const database = require('./data/db')
const server = express();

server.get('/', (request,response)=>{
  response.send('it is alive');

});

// GET /hubs => return a list of hubs in JSON format
server.get('/users', (req,res)=>{
  database.find().then(users=>{
    res.json(users);
  }).catch(err=>{res.json({error:err, message:'Something broke'})})
})

server.listen(5000, ()=>{
  console.log('API RUNNING PORT 5K')
});