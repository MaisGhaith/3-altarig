const router = require("express").Router();
const pool = require('../../db');

router.post("/order/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const {
            name, phone, notes, image,
            service_name, service_time, car_rent,
            location, service_id, choice_id, choice_name, order_no
        } = req.body;

        const sql = 'INSERT INTO orders (name, phone, notes, image, service_name, service_time, car_rent, location, service_id, choice_id, user_id, choice_name, order_no) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
        const newOrderData = [
            name, phone, notes, image, service_name, service_time, car_rent,
            location, service_id, choice_id, user_id, choice_name, order_no
        ];

        const newOrder = await pool.query(sql, newOrderData);
        res.json(newOrder.rows);
    } catch (error) {
        console.error("Error creating a new order:", error);
        res.status(500).json({ error: "Unable to create a new order" });
    }
});

module.exports = router;
