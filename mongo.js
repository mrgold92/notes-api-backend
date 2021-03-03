const mongoose = require("mongoose");
const pass = require('./utils/pass.js')



const connectionString =`mongodb+srv://david:${pass}@cluster0.bguqf.mongodb.net/davidb?retryWrites=true&w=majority`;

//conexion a mongodb
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
