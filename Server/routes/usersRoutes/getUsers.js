const router = require("express").Router();
const pool = require('../../db');

router.get("/getUsers", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (error) {
        res.status(500).json(error, "Server error, can't get users data from db")

    }
})


// router.get('/getUser/:user_id', async function (req, res) {
//     try {
//         const { user_id } = req.params;
//         console.log(user_id);
//         const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
//         console.log(user)
//         res.json(user.rows); // Assuming there is only one user with the given ID
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).json({ error: 'An error occurred while fetching user data' });
//     }
// });

module.exports = router;
