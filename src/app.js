const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const App = express();
App.use(express.json());
App.use(cors());
App.use(routes)

App.get('/hello', (req, res) => {
  res.json({hello: 'world'})
})

export default App;