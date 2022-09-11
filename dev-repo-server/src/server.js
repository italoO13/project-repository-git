import App from "./app";

const dotenv = require("dotenv");
dotenv.config();


require('./database/index')

App.listen(process.env.PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`)
})