const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/Collection');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    // console.log(req.user);
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});