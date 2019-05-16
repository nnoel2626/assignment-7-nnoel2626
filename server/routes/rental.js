//rental.js
const path = require('path');
const express = require('express');
const rentalRouter = express.Router();
const rentalShopController = require('../controllers/rentalShop');


/* GET all equipment  */
rentalRouter.get('/equipment', rentalShopController.getEquipment);

/* GET rental/add-equipment  */
rentalRouter.get('/add-equipment', rentalShopController.getAddEquipment);

/* POST rental/add-equipment  */
rentalRouter.post('/add-equipment', rentalShopController.postAddEquipment);

/* GET rental/equipment-details */
rentalRouter.get('/equipment-details/:equipmentId', rentalShopController.getEquipmentDetails);

/*  GET rental/edit-form*/
rentalRouter.get('/edit-equipment/:equipmentId', rentalShopController.getEditEquipment);

/* POST rental/edit-form or update*/
rentalRouter.post('/edit-equipment', rentalShopController.postEditEquipment);


/* Delete rental/delete-equipment*/
rentalRouter.post('/delete-equipment', rentalShopController.postDeleteEquipment);


module.exports = rentalRouter;