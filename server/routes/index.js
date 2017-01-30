'use scrict'
const mongoose = require('mongoose'),
express = require('express'),
router = express.Router(),
auth = require('../controllers/auth');
categoryCtrl = require('../controllers/categoryCtrl');

// Routes 
router.post('/login', auth.signIn);
router.post('/register', auth.signUp);
router.get('/category', categoryCtrl.getCategory);
router.post('/category', categoryCtrl.postCategory);
router.post('/addNewCategory', categoryCtrl.addNewCategory);
router.post('/syncAllCategory', categoryCtrl.syncAllCategory);

module.exports = router;
