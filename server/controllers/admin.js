//Admin controller
const Equipment = require('../models/equipment');
const bodyParser = require('body-parser');



/* Admin GET  list of equipment */
exports.getEquipment = (req, res, next) => {
    Equipment.find()
        .then(equipment => {
            //console.log(equipment);
            req.session.equipmentData = equipment;
            res.render('admin/equipment.pug', {
                equipment: equipment,
                pageTitle: 'Admin Equipment',
                path: '/admin/equipment',
            });
        })
        .catch(err => console.log(err));
};


/* Admin GET form to edit equipment */
exports.getAddEquipment = (req, res, next) => {
    res.render('admin/add-equipment', {
        pageTitle: 'Add Equipment',
        path: 'auth/admin/dashboard',
        // editing: false
    });
};

/* Admin Post Add-equipment */
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
    equipment.save()
        .then(result => {
            console.log('Created Equipment');
            res.redirect('/admin/equipment');
        })
        .catch(err => {
            console.log(err);
        });
};


/* Admin GET an equipment to edit*/
exports.getEditEquipment = (req, res, next) => {
    //console.log(req.params.id);
    let equipmentId = req.params.equipmentId;
    Equipment.findOne({
            '_id': equipmentId
        })
        .then((equipment) => {
            res.render('admin/edit-equipment', {
                pageTitle: 'Equipment Details',
                path: '/admin/equipment',
                equipment: equipment
            });
        }).catch((err) => {
            if (err) console.log(err);
        });
};


/* Admin POST edit equipment */
exports.postEditEquipment = (req, res, next) => {
    const equipmentId = req.body.equipmentId;
    const updatedName = req.body.name;
    const updatedBrand = req.body.brand;
    const updatedModel = req.body.model;
    const updatedSerialNumber = req.body.serialNumber;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;

    Equipment.findOne(equipmentId)
        .then(equipment => {
            equipment.name = updatedName;
            equipment.brand = updatedBrand;
            equipment.model = updatedModel;
            equipment.serialNumber = updatedSerialNumber;
            equipment.price = updatedPrice;
            equipment.imageUrl = updatedImageUrl;
            return equipment.save();
        })
        .then(result => {
            console.log('UPDATED equipment!');
            res.redirect('/admin/equipment');
        })
        .catch(err => console.log(err));
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