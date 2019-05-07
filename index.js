// implement your API here
//import express from 'express'; // ES2015 module import
const express = require('express'); //Common JS module import

const server = express();

server.listen(5000, ()=>{
  console.log('API RUNNING PORT 5K')
});