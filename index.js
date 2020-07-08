// implement your API here
//import express from 'express'; // ES2015 module import
const express = require('express'); //Common JS module import
const database = require('./data/db')
const server = express();
server.use(express.json()); // add this

server.get('/', (request,response)=>{
  response.send('it is alive');

});

// GET /users => return a list of hubs in JSON format
server.get('/users', (req,res)=>{
  database.find().then(users=>{
    res.status(200).json(users);
  }).catch(err=>{res.json({error:err, message:'Something broke'})})
})
//GET request by /users/:id 
server.get('/users/:id', (request, response)=>{
  const ID = request.params.id;
  database.findById(ID)
  // .then(user=>{console.log(user,'X')})
  .then(user=>{console.log('DONE');response.status(201).json(user)})
  // .catch(error=>{response.status(500).json({error:error, message:'user not found'})} )
  .catch(error=>{console.log('FAIL',error)} )
})

// PUT request to /users/:id
server.put('/users/:id', (request,response)=>{
  const updateInfo = request.params.id;
  console.log('updateInfo body=>',updateInfo);
  database.update(id, user)
  .then(user=>{
    response.status(201).json(user);
  })
  .catch(error=>{response.status(500).json({error:error, message:'UPDATE ERROR!'})})
})

// POST request to /users
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
// DEL request to /users/:id
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

// console logging port used
server.listen(5000, ()=>{
  console.log('API RUNNING PORT 5K')
});