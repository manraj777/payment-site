const express =  require('express');

const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./account");
const { authMiddleware } = require('../middleware');

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    res.json({
        balance: account.balance
    });
});

router.use("/user", userRouter);
router.use("/account", accountRouter);
modelue.exports = router;
