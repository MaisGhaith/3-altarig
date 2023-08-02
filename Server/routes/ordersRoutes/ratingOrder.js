const router = require("express").Router();
const pool = require('../../db');

router.put("/rate/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let { rating } = req.body;

        const sql = `UPDATE orders SET rating = $1 WHERE id = $2`;
        const editRating = [rating, id];
        const updateRating = await pool.query(sql, editRating);

        res.json(updateRating.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to edit rating" });

    }
})

module.exports = router;
