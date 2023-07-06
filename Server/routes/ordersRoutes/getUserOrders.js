const router = require("express").Router();
const pool = require('../../db');

router.get('/userOrders/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id);
    try {
        const userOrders = await pool.query("SELECT * FROM orders WHERE user_id = $1", [user_id]);
        res.json(userOrders.rows);
    } catch (error) {
        res.status(500).json({ error: "Server Error, can't get user Orders from db" });
    }
});

module.exports = router;

