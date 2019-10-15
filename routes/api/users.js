const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Call the User Model
const User = require('../../models/User');

//@route    Post api/users
//@desc     Register user
//@access   Public
router.post(
  '/',
  [
    check('name', 'Name is Required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please a password with 6 or more characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      res.send('User route');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

    //See if user exist
  }
);

module.exports = router;
