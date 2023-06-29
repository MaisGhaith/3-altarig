const router = require("express").Router();
const pool = require("../../db");

router.put("/editUser/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { user_name, phone_number } = req.body;

        if (!user_name || !phone_number) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        console.log(user_id, user_name, phone_number);

        const sql = `UPDATE users SET user_name = $1, phone_number = $2 WHERE user_id = $3`;
        const editValues = [user_name, phone_number, user_id];
        const updateUser = await pool.query(sql, editValues);
        console.log(updateUser);

        res.json(updateUser.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to edit user data" });
    }
});

module.exports = router;
