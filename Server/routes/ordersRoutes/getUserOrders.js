const router = require("express").Router();
const pool = require('../../db');

router.get('/userOrders/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id);
    try {
        const userOrders = await pool.query("SELECT * FROM orders WHERE status = false AND deleted = false AND user_id = $1", [user_id]);
        res.json(userOrders.rows);
    } catch (error) {
        res.status(500).json({ error: "Server Error, can't get user Orders from db" });
    }
});

router.get('/userDoneOrders/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id);
    try {
        const userOrders = await pool.query("SELECT * FROM orders WHERE status = true AND approved = true AND user_id = $1", [user_id]);
        res.json(userOrders.rows);
    } catch (error) {
        res.status(500).json({ error: "Server Error, can't get user Orders from db" });
    }
});

module.exports = router;