var mongoose = require('mongoose');
var log = require('log-util');
var Equipment = require('../models/equipment');


var apiRentalController = {};



//----------------Read a list of equipment-----------------//
apiRentalController.list = (req, res) => {
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


//---------Post create a piece of equipmen---------------//
apiRentalController.create = (req, res) => {
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


//----------------Read a single equipment---------------------//
apiRentalController.read = (req, res) => {
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

//--------------- update an piece of equipment--------------//
apiRentalController.update = (req, res) => {
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

//---------- delete an equipment--------------//
apiRentalController.delete = (req, res) => {
    rentalShopService.delete(req.params.equipment_id)
        .then((equipment) => {
            res.json(equipment);
        })
        .catch((err) => {
            log.error(`Deleting Equipment error: ${err}`);
            res.end('Deleting Equipment error.');
        });
};



//Rental service Class 
class rentalShopService {
    static list() {
        return Equipment.find({})
            .then((equipment) => {
                // found
                return equipment;
            });
    }

    static create(obj) {
        const equipment = new Equipment(obj);
        return equipment.save();
    }

    static update(id, data) {
        return Equipment.findById(id)
            .then((equipment) => {
                equipment.set(data);
                equipment.save();
                return equipment;
            });
    }

    static read(id) {
        return Equipment.findById(id)
            .then((equipment) => {
                // found
                return equipment;
            });
    }



    static delete(id) {
        return Equipment.deleteOne({
                _id: id
            })
            .then((obj) => {
                //removed
                return obj;
            })
    }
}

module.exports = apiRentalController;

module.exports.rentalShopService = rentalShopService;