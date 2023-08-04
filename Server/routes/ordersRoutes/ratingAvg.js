const router = require("express").Router();
const pool = require("../../db");

router.put("/ratingAvg/:service_id", async (req, res) => {
    const { service_id } = req.params;

    try {
        // Step 1: Calculate the average rating for the specified service_id
        const query = `
      UPDATE orders
      SET rating_avg = (SELECT AVG(rating) AS avg_rating FROM orders WHERE service_id = $1)
      WHERE service_id = $1
      RETURNING rating_avg; -- Return the calculated rating_avg for logging
    `;

        const result = await pool.query(query, [service_id]);

        if (result.rows.length === 0) {
            throw new Error("No rows found for the specified service_id");
        }

        const averageRating = result.rows[0].rating_avg;

        console.log("Average rating:", averageRating); // Log the average rating

        res.status(200).json({ message: `Average rating updated for service_id: ${service_id}` });
    } catch (error) {
        console.error("Error updating average rating:", error);
        res.status(500).json({ error: "Error updating average rating" });
    }
});

module.exports = router;
