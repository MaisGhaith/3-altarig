const router = require("express").Router();
const pool = require('../../db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTsecretKey = process.env.SECRET_KEY;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post("/register", async (req, res) => {
    try {
        const { user_name, user_email, user_password, phone_number, role, deleted, verification_code } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (user.rows.length !== 0) {
            if (!user.rows[0].flag) { // Check if the flag is false
                const verificationCode = Math.floor(100000 + Math.random() * 900000);

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user_email,
                    subject: 'Email Verification Code',
                    text: `Your verification code is: ${verificationCode}`
                };

                transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log("Error sending email:", error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        try {
                            await pool.query("UPDATE users SET verification_code = $1 WHERE user_email = $2", [verificationCode, user_email]);
                            console.log("Verification code updated successfully");
                        } catch (updateError) {
                            console.log("Error updating verification code:", updateError);
                        }
                    }
                });
            }

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
                from: process.env.EMAIL_USER,
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
            res.status(200).json({ user_id: newUserData.rows[0].user_id })

        }
    } catch (error) {
        res.status(500).json("Server error", error);
    }
});

// ! verify the verification code and edit the flag
router.put("/verify/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { verification_code } = req.body;

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

// ! re send the verification code 
router.put('/reSendCode/:user_id', async (req, res) => {

    const { user_id } = req.params;
    try {

        const getUserEmail = 'SELECT user_email FROM users WHERE user_id = $1';
        const emailResult = await pool.query(getUserEmail, [user_id]);
        const user_email = emailResult.rows[0].user_email;


        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const updateCode = 'UPDATE users SET verification_code = $1 WHERE user_id = $2';
        const updatedValues = await pool.query(updateCode, [verificationCode, user_id])

        const mailOptions = {
            from: process.env.EMAIL_USER,
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


        res.status(201).json("Verification code updated successfully")
    } catch (error) {
        res.status(500).json("Unable to update verification code");

    }

})


router.post('/register-google', async (req, res) => {

    const { name, email, id, role } = req.body;
    console.log(name, email, id, role)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    try {

        if (user.rows.length !== 0) {

            try {
                const sql = 'SELECT * FROM users WHERE user_email = $1';

                const allData = await pool.query(sql, [email]);
                const user = allData.rows[0]

                if (user && user.deleted === true) {
                    return res.status(403).json({ user_id: user.id, message: 'your account has been deactivated by admin' })
                    // ! 403 Forbidden : When the user is found but their account has been deleted by the administrator
                    // ! This indicates that the user has the necessary permissions, but access is denied due to their status (account is deactivated).
                }

                else {
                    const token = jwt.sign({
                        user_id: user.user_id,
                        user_name: user.user_name,
                        user_email: user.user_email,
                        phone_number: user.phone_number,
                        role: user.role,
                        deleted: user.deleted,
                    }, JWTsecretKey);
                    return res.status(201).json({ token: token, message: 'User login successful', user_id: user.id });
                }

            } catch (error) {
                return res.status(500).json("server error")
            }

        } else {
            try {

                const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
                console.log(user)
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const bcryptPassword = await bcrypt.hash(id, salt);

                const newUsersql = "INSERT INTO users (user_name, user_email, user_password, role) VALUES ($1, $2, $3, $4) RETURNING *";
                const newUserValues = [name, email, bcryptPassword, role || 'user'];

                const insertResult = await pool.query(newUsersql, newUserValues);
                console.log(insertResult)
                const newUserData = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
                // res.status(200).json({ user_id: newUserData.rows[0].id })

                const token = jwt.sign({
                    user_id: newUserData.user_id,
                    user_name: newUserData.user_name,
                    user_email: newUserData.user_email,
                    phone_number: newUserData.phone_number,
                    role: newUserData.role,
                    deleted: newUserData.deleted,
                }, JWTsecretKey);
                return res.status(201).json({ token: token, message: 'User login successful', user_id: newUserData.id });


            } catch (error) {
                res.status(500).send("Server error");
            }
        }
    } catch (error) {
        res.status(500).send("Server error");
    }

})

module.exports = router;
