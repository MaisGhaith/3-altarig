const router = require("express").Router();
const pool = require('../../db');

router.put('/deleteUserOrder/:id', async (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE orders SET deleted = true WHERE id = $1";
    const deleteValues = [id];

    try {
        await pool.query(sql, deleteValues);
        res.json("Your order has been soft deleted");
    } catch (error) {
        console.log(error);
        res.status(500).json("An error occurred while soft deleting the order");
    }
});

module.exports = router;
