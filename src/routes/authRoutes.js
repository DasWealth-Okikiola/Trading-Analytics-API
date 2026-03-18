const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and get token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

// get a personalized user
router.get("/me", authMiddleware, (req, res) => {
    res.json({
        message: "Access granted",
        user: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
        },
      });
});

// @route POST /api/auth/register
router.post("/register", register);

// @route POST /api/auth/login
router.post("/login", login);

module.exports = router;