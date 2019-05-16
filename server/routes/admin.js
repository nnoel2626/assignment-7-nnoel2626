//Admin router
const express = require('express');
const adminController = require('../controllers/admin');
const adminRouter = express.Router();
const isAuth = require('../middleware/isAuth');
require('../controllers/passport');


/* GET admin/equipment all */
adminRouter.get('/equipment', isAuth, adminController.getEquipment);

/* GET admin/add-equipment  */
adminRouter.get('/add-equipment', isAuth, adminController.getAddEquipment);

/* POST admin/add-equipment  */
adminRouter.post('/add-equipment', isAuth, adminController.postAddEquipment);

/*  GET admin/edit-equipment*/
adminRouter.get('/edit-equipment/:equipmentId', isAuth, adminController.getEditEquipment);

/* POST admin/edit-equipment */
adminRouter.post('/edit-equipment', isAuth, adminController.postEditEquipment);

/* Delete admin/delete-equipment*/
adminRouter.post('/delete-equipment', isAuth, adminController.postDeleteEquipment);


module.exports = adminRouter;