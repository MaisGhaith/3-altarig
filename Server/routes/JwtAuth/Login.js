const router = require("express").Router();
const pool = require('../../db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRET_KEY;
const app = require('../../index');

router.post('/login', (req, res) => {
    const { user_email, user_password, role, deleted } = req.body; // Assuming the email and password are provided in the request body

    const sql = 'SELECT * FROM users WHERE deleted = false AND flag = true AND user_email = $1';

    pool.query(
        sql, [user_email],
        async (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            console.log(user_email, user_password, role, deleted)
            const user = results.rows[0];

            if (!user || !(await bcrypt.compare(user_password, user.user_password))) {
                return res.status(401).send("Incorrect email or password");
            }

            if (user.deleted === true) {
                return res

                    .send('Your account was deleted or not verified, please try again with another email');
            }

            const token = jwt.sign({
                user_id: user.user_id,
                user_name: user.user_name,
                user_email: user.user_email,
                phone_number: user.phone_number,
                role: user.role,
                deleted: user.deleted,
            }, SECRETKEY);


            res.json({ token: token, message: 'User login successful' });

        }
    );
});

module.exports = router;
