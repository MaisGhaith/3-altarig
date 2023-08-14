const router = require("express").Router();
const pool = require('../../db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRET_KEY;
const app = require('../../index');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/login', async (req, res) => {
    const { user_id } = req.params;
    const { user_email, user_password } = req.body; // Assuming the email and password are provided in the request body
    console.log(user_email, user_password)
    const sql = 'SELECT * FROM users WHERE user_email = $1';

    try {
        const allData = await pool.query(sql, [user_email]);
        const user = allData.rows[0]
        console.log(user)

        if (!user) {
            console.log("user not found");
            return res.status(404).json("user not found")
        }

        else if (user && user.deleted === true) {
            console.log('your account has been deactivated by admin');
            return res.status(403).json({ user_id: user.user_id, message: 'your account has been deactivated by admin' })
            // ! 403 Forbidden : When the user is found but their account has been deleted by the administrator
            // ! This indicates that the user has the necessary permissions, but access is denied due to their status (account is deactivated).
        }

        else if (user && user.flag === false) {
            console.log(`Your email is not verified, please verify it`);

            const verificationCode = Math.floor(100000 + Math.random() * 900000);
            const updateCode = 'UPDATE users SET verification_code = $1 WHERE user_id = $2';
            const updatedValues = await pool.query(updateCode, [verificationCode, user.user_id])
            console.log(verificationCode)

            const mailOptions = {
                from: '3.altarig@gmail.com',
                to: user_email,
                subject: 'Email Verification Code',
                text: `Your verification code is: ${verificationCode}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("122", error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            // return res.status(201).json("Verification code updated successfully")
            res.status(403).json({ user_id: user.user_id, message: `Your email is not verified, please verify it` })
        }

        else if (!(await bcrypt.compare(user_password, user.user_password))) {
            console.log("Incorrect email or password")
            return res.status(401).json({ user_id: user.user_id, message: "Incorrect email or password" })
        }

        else {
            console.log("User login successful")
            const token = jwt.sign({
                user_id: user.user_id,
                user_name: user.user_name,
                user_email: user.user_email,
                phone_number: user.phone_number,
                role: user.role,
                deleted: user.deleted,
            }, SECRETKEY);
            return res.status(201).json({ token: token, message: 'User login successful', user_id: user.user_id });
        }

    } catch (error) {
        console.log("server error")
        return res.status(500).json("server error")
    }

});


// ! verify the verification code and edit the flag
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
                const token = jwt.sign({ user_id: userData.user_id, user_name: userData.user_name, user_email: userData.user_email, phone_number: userData.user_password, deleted: userData.deleted, role: userData.role }, SECRETKEY);


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


module.exports = router;
