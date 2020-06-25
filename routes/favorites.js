const express = require('express');

const router = express.Router();

const {
  getUserFavorites,
  toggleUserFavorites,
} = require('../controllers/favorites');

router.get('/:userid', getUserFavorites);
router.put('/:userid/toggle-user-favorite', toggleUserFavorites);

module.exports = router;
