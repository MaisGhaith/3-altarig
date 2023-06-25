
const express = require("express");
const cors = require("cors");
const router = express.Router();

const app = express();
const PORT = 5151;

//* middleware //
app.use(express.json()); // access data from client side   // req.body
app.use(cors()); // to make our backend interact with frontend

// * Routes //
// register and login routes

app.use("/auth", require('./routes/jwtAuth'))
app.use("/authh", require('./routes/jwtAuth'))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app;