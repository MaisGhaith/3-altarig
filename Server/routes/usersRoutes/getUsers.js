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


module.exports = router;
