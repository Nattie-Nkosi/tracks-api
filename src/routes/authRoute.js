const express = require("express");
const { body } = require("express-validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validateRequest = require("../middlewares/validate-request");

const User = mongoose.model("User");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password"),
  ],
  validateRequest,
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = new User({ email, password });
      await user.save();

      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_KEY
      );

      res.send({ token });
    } catch (err) {
      res.status(422).send(err.message);
    }
  }
);

module.exports = router;
