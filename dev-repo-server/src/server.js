import App from "./app";

const dotenv = require("dotenv");
dotenv.config();


require('./database/index')

App.listen(3001, () => {
  console.log('Ouvindo na porta 3001')
})