// const jwt = require("jsonwebtoken");
// const JWTsecretKey = process.env.SECRET_KEY;
// console.log(JWTsecretKey)
// module.exports = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).json({ message: 'No token provided.' });
//     }
//     jwt.verify(token, JWTsecretKey, (err, decoded) => {
//         if (err) {
//             console.log("token error:", err);
//             return res.status(403).json({ message: 'Failed to authenticate token.' });
//         }
//         console.log("token Authenticated");
//         req.user = decoded;
//         console.log(decoded);
//         next();
//     });
// };

const jwt = require("jsonwebtoken");
const JWTsecretKey = process.env.SECRET_KEY // Replace with your actual secret key

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    console.log("Received token:", token); // Debug log

    jwt.verify(token.split(" ")[1], JWTsecretKey, (err, decoded) => {
        if (err) {
            console.log("Token error:", err);
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
        console.log("Token Authenticated");
        console.log("Decoded:", decoded); // Debug log
        req.user = decoded;
        next();
    });
};
