const express = require('express');
const router = express.Router();
const zod = require("zod");
const { user } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ 
            message: "Email already taken/Incorrect inputs" 
        })
    }
    const existingUser = await user.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(409).json({
            message: "Email already taken"
        })
    }
    const user = await user.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    })
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: token,
    });
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})
router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await user.findOne({
        username: req.body.username,
        password: req.body.password,
    })
    if (user) {
        const token = jwt.sign({
            userId : user._id
        }, JWT_SECRET);
        res.json({
            token: token,
        })
        return;
    }
    res.status(401).json({
        message: "Invalid username or password"
    })
});
module.exports = router;