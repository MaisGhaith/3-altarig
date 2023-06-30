const router = require("express").Router();
const pool = require('../../db');

router.post('/locations', (req, res) => {
    const { latitude, longitude, url } = req.body;

    // Insert the location into the database
    const query = 'INSERT INTO location (latitude, longitude, url) VALUES ($1, $2, $3)';

    pool
        .query(query, [latitude, longitude, url])
        .then(() => {
            res.status(200).json({ message: 'Location added successfully' });
        })
        .catch((error) => {
            console.error('Error adding location:', error);
            res.status(500).json({ message: 'Error adding location' });
        });
});

module.exports = router;