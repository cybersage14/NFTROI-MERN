const express = require('express');
const router = express.Router();

const Venue = require('../../models/Venue');

router.get('/all', async (req, res) => {
    try {
        let venues = await Venue.find({});
        res.json(venues);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Sever Error');
    }
})

router.get('/', async (req, res) => {
    try{
        let venue = await Venue.findById(req.query.id);
        res.json(venue);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Sever Error');
    }
})

module.exports = router;