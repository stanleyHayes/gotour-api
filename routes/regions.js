const {
    getRegions,
    getRegion,
    createRegion,
    updateRegion,
    deleteRegion,
} = require('../controllers/region');

const express = require('express');
const router = express.Router();

router.route('/').get(getRegions).post(createRegion);

router.route('/:id').get(getRegion).put(updateRegion).delete(deleteRegion);

module.exports = router;