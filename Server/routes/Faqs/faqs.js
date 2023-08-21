const router = require("express").Router();
const pool = require('../../db');
const jwt = require("jsonwebtoken");
const JWTsecretKey = process.env.SECRET_KEY;

router.post('/question', async (req, res) => {
    try {
        const { user_name, question } = req.body; // Get the question from the request body


        const sql = 'INSERT INTO faqs ( question, user_name) VALUES ($1, $2)';
        const newQuestionData = [question, user_name];

        const newQuestion = await pool.query(sql, newQuestionData);

        res.json(newQuestion.rows[0])

    } catch (error) {
        console.error("Error adding a new question :", error);
        res.status(500).json({ error: "Unable to create a new question" });

    }
})


router.get("/faqs-get", async (req, res) => {

    try {
        const sql = await pool.query("SELECT * FROM faqs WHERE display = true  ",);
        console.log("Fetched rows:", sql);
        res.json(sql.rows);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Server error, can't get FAQs data from db" });
    }
});


module.exports = router;