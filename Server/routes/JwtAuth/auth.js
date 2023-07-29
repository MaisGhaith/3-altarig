const router = require("express").Router();
const pool = require('../../db');
const auth = require('../../middleware/auth');

router.get('/auth', auth, async (req, res) => {
    res.json(req.user)
})


module.exports = router;

