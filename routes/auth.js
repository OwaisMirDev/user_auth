
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const verifyToken=require('../middleware/authMiddleware');


router.post('/signup', signup);  
router.post('/login', login);    

router.get('/profile', verifyToken, (req, res) => {
    res.send(`User ID: ${req.userId} - This is a protected route.`);
  });

module.exports = router;
