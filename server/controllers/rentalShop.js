//rentalhop controller
const Equipment = require('../models/equipment');



exports.getEquipment = (req, res, next) => {
    Equipment.find()
        .then(equipment => {
            //console.log(equipment);
            req.session.equipmentData = equipment;
            res.render('rental/equipment', {
                equipment: equipment,
                pageTitle: 'Admin Equipment',
                path: '/admin/equipment',
            });
        })
        .catch(err => console.log(err));
};

/* user GET an equipment-details */
exports.getEquipmentDetails = (req, res, next) => {
    console.log(req.params.equipmentId);
    let equipmentId = req.params.equipmentId;
    Equipment.findOne({
            '_id': equipmentId
        })
        .then((equipment) => {
            //console.log(equipment);
            res.render('rental/equipment-details', {
                pageTitle: 'Equipment Details',
                path: '/rental/equipment-details',
                equipment: equipment
            });
        }).catch((err) => {
            if (err) console.log(err);
        });

};


/* user GET form to add equipment */
exports.getAddEquipment = (req, res, next) => {
    res.render('rental/add-equipment', {
        pageTitle: 'Add Equipment',
        path: '/rental/add-equipment',
        // editing: false
    });
};


/* rental Post Add-equipment */
exports.postAddEquipment = (req, res, next) => {
    const name = req.body.name;
    const brand = req.body.brand;
    const model = req.body.model;
    const serialNumber = req.body.serialNumber;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    const equipment = new Equipment({
        name: name,
        brand: brand,
        model: model,
        serialNumber: serialNumber,
        price: price,
        imageUrl: imageUrl
    });
    // equipmentSave = rentalhopService.create(equipment)
    equipment.save()
        .then(result => {
            console.log('equipmentSave');
            res.redirect('/rental/equipment');
        })
        .catch(err => {
            console.log(err);
        });
};

/* user GET an equipment to update*/
exports.getEditEquipment = (req, res, next) => {
    //console.log(req.params.id);
    let equipmentId = req.params.equipmentId;
    Equipment.findOne({
            '_id': equipmentId
        })
        .then((equipment) => {
            res.render('rental/edit-equipment', {
                pageTitle: 'Equipment Details',
                path: '/rental/equipment',
                equipment: equipment
            });
        }).catch((err) => {
            if (err) console.log(err);
        });

};


/* Admin POST edit equipment */
exports.postEditEquipment = (req, res, next) => {
    const updatedName = req.body.name;
    const updatedBrand = req.body.brand;
    const updatedModel = req.body.model;
    const updatedSerialNumber = req.body.serialNumber;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;

    Equipment.findById(req.body.equipmentId)
        .then(equipment => {
            equipment.name = updatedName;
            equipment.brand = updatedBrand;
            equipment.model = updatedModel;
            equipment.serialNumber = updatedSerialNumber;
            equipment.price = updatedPrice;
            equipment.imageUrl = updatedImageUrl;
            equipment.save();
        })
        .then(result => {
            console.log('UPDATED equipment!');
            res.redirect('/rental/equipment');
        }).catch((err) => {
            if (err) console.log(err);
            ead
        });
};

/* Admin delete a piece of equipment */
exports.postDeleteEquipment = (req, res) => {
    //console.log(req.body.equipmentId)
    Equipment.findByIdAndRemove(req.body.equipmentId)
        .then((equipment) => {
            console.log('DESTROYED EQUIPMENT');
            res.redirect('/rental/equipment');
        })
        .catch((err) => {
            log.error(`Deleting Equipment error: ${err}`);
            res.end('Deleting Equipment error.');
        });
};