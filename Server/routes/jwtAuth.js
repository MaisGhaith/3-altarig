// const router = require("express").Router();
// const pool = require('../db')
// const bcrypt = require("bcrypt")
// //resgistering
// router.post("/register", async (req, res) => {
//     try {

//         //* 1 destructure the req.body  (name, email, passowrd, phone)

//         const { user_name, user_email, user_password, phone_number } = req.body;

//         //* 2 check if user exist (if user exist then throw error)

//         // const user = await pool.query("SELECT * FROM users WHERE user_email = $1, user_name = $2, user_password = $3, phone_number = $4",
//         //     [user_email, user_name, user_password, phone_number])
//         const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
//             [user_email])
//         console.log(user.rows)


//         res.status(201).json({ "user": user });
//         console.log(user_email)

//         if (user.rows.length !== 0) {
//             return res.status(401).send("User already exist")
//         }


//         //* 3 Bcrypt the user password

//         const saltRound = 10;
//         const salt = await bcrypt.genSalt(saltRound);

//         const bcryptPasword = await bcrypt.hash(user_password, salt)

//         console.log(bcryptPasword)
//         //* 4 enter the new user inside our db

//         const newUser = await pool.query
//             ("INSERT INTO users (user_name, user_email, user_password, phone_number) VALUES ($1, $2, $3, $4)",
//                 [user_name, user_email, bcryptPasword, phone_number]);

//         res.status(200).json({ "user": newUser });

//         // res.send(newUser)

//         // console.log(user_name)

//         //* 5 generating our jwt token
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).send("Server error")
//     }
// });
// module.exports = router;





const router = require("express").Router();
const pool = require('../db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = 'a24f41837ef05ad9e52a3794dab8c0055cc7baf383db5d19534454768751a344';


router.post("/register", async (req, res) => {
    try {
        //* 1 destructure the req.body  (name, email, passowrd, phone)

        const { user_name, user_email, user_password, phone_number } = req.body;

        //* 2 check if user exist (if user exist then throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
            [user_email]);
        console.log(user.rows)


        if (user.rows.length !== 0) {
            res.status(201).json(["user already exist", user.rows]);

        } else {
            //* 3 Bcrypt the user password
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(user_password, salt);

            //* 4 enter the new user inside our db

            const newUsersql = "INSERT INTO users (user_name, user_email, user_password, phone_number) VALUES ($1, $2, $3, $4) RETURNING * ";
            const newUserValues = [user_name, user_email, bcryptPassword, phone_number]

            const insertResult = await pool.query(newUsersql, newUserValues);
            // let user0 = newUser.rows[0]
            // console.log(insertResult)

            // res.send("User registered successfully");

            //* 5 generating our jwt token

            const insertedUserId = insertResult.rows[0].user_id;

            const token = jwt.sign({ user_id: insertedUserId, user_name, user_email, phone_number }, secretKey);
            res.status(200).json({ token, message: 'User registered successfully' });

            // res.status(200).json({ "user": newUser.rows[0] });


        }


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;






