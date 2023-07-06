
const express = require("express");
const cors = require("cors");
const router = express.Router();
const pool = require('./db');

const app = express();
const PORT = 5151;

//* middleware //
app.use(express.json()); // access data from client side   // req.body
app.use(cors()); // to make our backend interact with frontend

// * Routes //
// register and login routes

app.use("/Register", require('./routes/JwtAuth/Register'))
app.use("/Login", require('./routes/JwtAuth/Login'))

// user routes
app.use("/getUsers", require('./routes/usersRoutes/getUsers'));
app.use("/edit", require('./routes/usersRoutes/editUser'));


// ! Location routes
app.use("/location", require('./routes/Location/Location'));

// ! order routes
app.use("/order", require('./routes/ordersRoutes/addOrder'));
// app.use("/userOrders", require('./routes/ordersRoutes/getUserOrders'));
app.use("/userOrders", require('./routes/ordersRoutes/getUserOrders'));

// Define the POST route for adding a location














app.get('/getUser/:user_id', async function (req, res) {
    try {
        const { user_id } = req.params;
        console.log(user_id);
        const user = await pool.query("SELECT user_name, phone_number, user_email FROM users WHERE user_id = $1", [user_id]);
        console.log(user);
        res.json(user.rows); // Assuming there is only one user with the given ID
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app;