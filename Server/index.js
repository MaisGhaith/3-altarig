
const express = require("express");
const cors = require("cors");
// import jwtAuthRoutes from './routes/jwtAuth'
const app = express();
const PORT = 5151;

//* middleware //
app.use(express.json()); // access data from client side   // req.body
app.use(cors()); // to make our backend interact with frontend

// * Routes //
// register and login routes

app.use("/auth", require('./routes/jwtAuth'))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})