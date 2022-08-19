const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const App = express();
App.use(express.json());
App.use(cors());
App.use(routes)

App.use((err, req, res, next) => {
  console.log(err)
  if(!err.code) {
    return res.status(500).json({message:'Internal server error.'})
  }
  return res.status(err.code).json({message: err.message})
})

export default App;