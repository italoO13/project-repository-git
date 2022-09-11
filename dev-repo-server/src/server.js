import App from "./app";

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

require('./database/index')

App.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`)
})