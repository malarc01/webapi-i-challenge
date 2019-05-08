// implement your API here
//import express from 'express'; // ES2015 module import
const express = require('express'); //Common JS module import
const database = require('./data/db')
const server = express();
server.use(express.json()); // add this

server.get('/', (request,response)=>{
  response.send('it is alive');

});

// GET /hubs => return a list of hubs in JSON format
server.get('/users', (req,res)=>{
  database.find().then(users=>{
    res.status(200).json(users);
  }).catch(err=>{res.json({error:err, message:'Something broke'})})
})

server.get('/users/:id', (request, response)=>{
  const ID = request.params.id;
  database.findById(ID)
  .then(user=>{response.status(201).json(user)})
  .catch(error=>{response.status(500).json({error:error, message:'user not found'})} )
})


server.post('/users',(req,res)=>{
// one way to get data from the client is in the request's body
// axios.post(url, data) => the data shows up as the body on the server
const userInfo = req.body;
console.log('request body: ',userInfo)
database.insert(userInfo)
  .then(user=>{
    res.status(201).json(user);
  })
  .catch(error =>{res.status(500).json({error:error,message:'Error adding the user'})})
})

server.delete('/users/:id',(request, response)=>{
  //axios.delete(.../hubs/${id})
  const userId = request.params.id; //request.params has the URL parameters 
  database
  .remove(userId)
  .then(deleted=>{
    // res.status(200).json(deleted);
    response.status(200).end(); // returns response to client w/o data
    
  })
  .catch(error=>
    {response.status(500).json({error:error, message:'ERROR REMOVING USER'})})
})

server.listen(5000, ()=>{
  console.log('API RUNNING PORT 5K')
});