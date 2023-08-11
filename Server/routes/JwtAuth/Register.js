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
        const { user_name, user_email, user_password, phone_number, role, deleted, verification_code } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (user.rows.length !== 0) {
            return res.status(409).json({ message: "User already exists", user: user.rows[0] });
        } else {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const bcryptPassword = await bcrypt.hash(user_password, salt);

            const newUsersql = "INSERT INTO users (user_name, user_email, user_password, phone_number, deleted, role, verification_code) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
            const newUserValues = [user_name, user_email, bcryptPassword, phone_number, deleted, role || 'user', verification_code];

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

            const newUserData = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);
            console.log(newUserData.rows[0])
            // console.log(newUserData[0].user_id)
            res.status(200).json({ user_id: newUserData.rows[0].user_id })

        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

// ...
router.put("/verify/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { verification_code } = req.body;
        console.log(user_id, verification_code)

        const updateSql = "SELECT * FROM users WHERE user_id = $1 AND verification_code = $2";
        const result = await pool.query(updateSql, [user_id, verification_code]);

        if (result.rowCount === 1) {
            const updateFlag = "UPDATE users SET flag = true WHERE user_id = $1"
            const updatedValues = await pool.query(updateFlag, [user_id])
            try {
                const userData = result.rows[0];
                const token = jwt.sign({ user_id: userData.user_id, user_name: userData.user_name, user_email: userData.user_email, phone_number: userData.user_password, deleted: userData.deleted, role: userData.role }, JWTsecretKey);


                return res.status(201).json({ token: token, user_name: userData.user_name, user_email: userData.user_email, message: 'User registered successfully' });
            } catch (error) {
                console.error('JWT signing error:', error);
                return res.status(500).json({ message: 'Error generating JWT' });
            }
            // res.status(200).json({ message: "User verified successfully" });

        } else {
            res.status(400).json({ message: "Invalid user_id or verification code" });
        }
    } catch (error) {
        console.error("Error verifying user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// ...

module.exports = router;
