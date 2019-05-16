var mongoose = require('mongoose');
var log = require('log-util');
var Equipment = require('../models/equipment');
var rentalShopService = require('../controllers/rentalShop');


var apiAdminController = {};

apiAdminController.list = (req, res) => {
    rentalShopService.list({})
        .then((equipment) => {
            if (equipment) {
                res.send(JSON.stringify(equipment));
            } else {
                res.end('No Equipment found.');
            }
        })
        .catch((err) => {
            log.error(`Listing Equipmentserror: ${err}`);
            res.end('Listing Equipment error.');
        });
};

apiAdminController.create = (req, res) => {
    rentalShopService.create({
            name: req.body.name,
            brand: req.body.brand,
            model: req.body.model,
            serialNumber: req.body.serialNumber,
            price: req.body.price,
            imageUrl: req.body.imageUrl
        })
        .then((equipment) => {
            res.json(equipment);
        })
        .catch((err) => {
            log.error(`Creating Equipment error: ${err}`);
            res.end('Creating Equipment error.');
        });
};

apiAdminController.read = (req, res) => {
    rentalShopService.read({
            _id: req.params.equipment_id
        })
        .then((equipment) => {
            res.json(equipment);
        })
        .catch((err) => {
            log.error(`Reading Equipment error: ${err}`);
            res.end('Reading Equipment error.');
        });
};

apiAdminController.update = (req, res) => {
    rentalShopService.update(
            req.params.equipment_id, {
                name: req.body.name,
                brand: req.body.brand,
                model: req.body.model,
                serialNumber: req.body.serialNumber,
                price: req.body.price,
                imageUrl: req.body.imageUrl

            }, {
                new: true
            }
        )
        .then((equipment) => {
            res.json(equipment);
        })
        .catch((err) => {
            log.error(`Updating Equipment error: ${err}`);
            res.end('Updating Equipment error.');
        });
};


apiAdminController.delete = (req, res) => {
    rentalShopService.delete(req.params.equipment_id)
        .then((equipment) => {
            res.json(equipment);
        })
        .catch((err) => {
            log.error(`Deleting Equipment error: ${err}`);
            res.end('Deleting Equipment error.');
        });
};


module.exports = apiAdminController;