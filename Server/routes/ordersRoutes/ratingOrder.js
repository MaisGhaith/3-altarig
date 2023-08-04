const router = require("express").Router();
const pool = require('../../db');

router.put("/rate/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, service_id } = req.body;
        console.log("this is service Id", service_id)

        const sql = `UPDATE orders SET rating = $1 WHERE id = $2`;
        const editRating = [rating, id];
        const updateRating = await pool.query(sql, editRating);
        const orderRate = await pool.query("SELECT rating FROM orders WHERE id = $1", [id]);

        const ratingAvg = await pool.query(`
            UPDATE orders
            SET rating_avg = (SELECT AVG(rating) AS avg_rating FROM orders WHERE service_id = $1)
            WHERE service_id = $1
            RETURNING rating_avg; -- Return the calculated rating_avg for logging
          `, [service_id]);

        console.log(ratingAvg.rows);

        const responseData = {
            updatedRating: updateRating.rows,
            orderRate: orderRate.rows,
            ratingAvg: ratingAvg.rows,
        };

        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to edit rating" });
    }
});

module.exports = router;
