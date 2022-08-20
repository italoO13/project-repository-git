import App from "./app";

const dotenv = require("dotenv");
dotenv.config();


require('./database/index')

App.listen(3005, () => {
  console.log('Ouvindo na porta 3005')
})