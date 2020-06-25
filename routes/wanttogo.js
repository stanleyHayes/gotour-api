const express = require('express');

const router = express.Router();

const {
  getUserWantToGo,
  toggleUserWantToGo,
} = require('../controllers/wanttogo');

router.get('/:userid', getUserWantToGo);
router.put('/:userid/toggle-user-wanttogo', toggleUserWantToGo);

module.exports = router;
