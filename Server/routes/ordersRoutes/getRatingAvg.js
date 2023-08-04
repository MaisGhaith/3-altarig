const router = require("express").Router();
const pool = require("../../db");

router.get("/getRatingAvg/:service_id", async (req, res) => {

    const { service_id } = req.params;

    console.log(service_id)
    try {
        const ratingAvg = await pool.query("SELECT rating_avg from orders WHERE service_id = $1", [service_id]);
        res.json(ratingAvg.rows);

    } catch (error) {
        res.status(500).json({ error: "Server error, can't get rating avg data from db" })

    }

})

module.exports = router;
