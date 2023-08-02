const router = require("express").Router();
const pool = require('../../db');

router.get("/getRating/:id", async (req, res) => {

    const { id } = req.params;
    try {
        const orderRate = await pool.query("SELECT rating FROM orders WHERE id = $1", [id]);
        res.json(orderRate.rows);

    } catch (error) {
        res.status(500).json({ error: " server error, can't get order rate" })
    }
})

module.exports = router;