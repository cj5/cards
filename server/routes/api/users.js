const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hey from Server: /api/users');
});

module.exports = router;
