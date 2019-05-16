var express = require('express');
const router = express.Router();
var apiAdminController = require('../controllers/apiAdminController');

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
router.get('/', apiAdminController.list); // read all equipment
router.post('/create', apiAdminController.create); // create new equipment
router.get('/:equipment_id', apiAdminController.read); // read a specific equipment
router.put('/update/:equipment_id', apiAdminController.update); // update a specific equipment
router.delete('/delete/:equipment_id', apiAdminController.delete); // delete a specific equipment

module.exports = router;