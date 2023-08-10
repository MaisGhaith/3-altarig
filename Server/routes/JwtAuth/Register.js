const router = require("express").Router();
const pool = require('../../db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTsecretKey = process.env.SECRET_KEY;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '3.altarig@gmail.com',
        pass: 'kmtdorolguhcobyv'
    }
});

router.post("/register", async (req, res) => {
    try {
        const { user_name, user_email, user_password, phone_number, role, deleted } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (user.rows.length !== 0) {
            return res.status(201).json(["user already exist", user.rows]);
        } else {
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(user_password, salt);

            const newUsersql = "INSERT INTO users (user_name, user_email, user_password, phone_number, deleted, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ";
            const newUserValues = [user_name, user_email, bcryptPassword, phone_number, deleted, role || 'user'];

            const insertResult = await pool.query(newUsersql, newUserValues);

            const verificationCode = Math.floor(100000 + Math.random() * 900000);

            const mailOptions = {
                from: '3.altarig@gmail.com',
                to: user_email,
                subject: 'Email Verification Code',
                text: `Your verification code is: ${verificationCode}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            await pool.query("UPDATE users SET verification_code = $1 WHERE user_email = $2", [verificationCode, user_email]);

            try {
                const insertedUserId = insertResult.rows[0].user_id;
                const token = jwt.sign({ user_id: insertedUserId, user_name, user_password, user_email, phone_number, deleted, role }, JWTsecretKey);
                console.log(token);

                // Retrieve the verification code from the user's data
                const userVerificationCode = verificationCode;

                return res.status(200).json({ token, verificationCode: userVerificationCode, message: 'User registered successfully' });
            } catch (error) {
                console.error('JWT signing error:', error);
                return res.status(500).json({ message: 'Error generating JWT' });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});


router.put("/verify/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        // const { verification_code } = req.body;

        // Update the flag to true in your database
        const updateSql = "UPDATE users SET flag = true WHERE user_id = $1 ";
        await pool.query(updateSql, [user_id]);

        res.status(200).json({ message: "User verified successfully" });
    } catch (error) {
        console.error("Error verifying user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
