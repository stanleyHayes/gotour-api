const {
  getTouristsites,
  getTouristsite,
  createTouristsite,
  updateTouristsite,
  deleteTouristsite,
} = require('../controllers/Touristsite');

const express = require('express');
const router = express.Router();

router.route('/').get(getTouristsites).post(createTouristsite);

router
  .route('/:id')
  .get(getTouristsite)
  .put(updateTouristsite)
  .delete(deleteTouristsite);

module.exports = router;
