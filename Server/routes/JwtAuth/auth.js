const router = require("express").Router();
const pool = require('../../db');
const auth = require('../../middleware/auth');

router.get('/auth', auth, async (req, res) => {

    console.log("********************************************************************************")
    console.log(req.user)
    res.json(req.user)
    console.log("****************************************************************************")

})


module.exports = router;

