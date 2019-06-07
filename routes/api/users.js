const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator/check');

//@route        Post api/USERS
//@description  Register User
//@access       Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Enter a valid Email').isEmail(),
    check(
      'password',
      'Password must contain one lowercase character, one uppercase character, one special character and minimum 8 characters'
    ).matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('User Route');
  }
);

module.exports = router;
