const express = require('express');
const router = express.Router();
const regionsController = require('../controllers/regions.controller');
const { verifyToken, checkRole } = require('../middlewares/auth.middleware');

router.get('/', regionsController.getAllRegions);
router.get('/:regionId', regionsController.getRegionById);
router.post('/', verifyToken, checkRole(['admin']), regionsController.createRegion);
router.put('/:regionId', verifyToken, checkRole(['admin']), regionsController.updateRegion);
router.delete('/:regionId', verifyToken, checkRole(['admin']), regionsController.deleteRegion);

module.exports = router;
