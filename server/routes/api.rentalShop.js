//users.js
const express = require('express');
const router = express.Router();
const apiRentalController = require('../controllers/apiRentalController');


router.use((req, res, next) => {
    res.set({
        // allow any domain, allow REST methods we've implemented
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
        // Set content-type for all api requests
        'Content-type': 'application/json'
    });
    if (req.method == 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// router.REST_VERB('EXPRESS_ROUTE', equipment.ACTION)
router.get('/', apiRentalController.list); // read all equipment
router.post('/create', apiRentalController.create); // create new equipment
router.get('/:equipment_id', apiRentalController.read); // read a specific equipment
router.put('/update/:equipment_id', apiRentalController.update); // update a specific equipment
router.delete('/delete/:equipment_id', apiRentalController.delete); // delete a specific equipment


module.exports = router;