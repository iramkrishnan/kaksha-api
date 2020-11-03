const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const Class = require("../models/Class");

router.post("", verifyToken, async (req, res) => {
    try {
        const updated = await Class.update(
            { number: req.body.number },
            {
                is_active: req.body.is_active,
                started_at: req.body.started_at,
                ended_at: req.body.ended_at,
            },
            { upsert: true }
        );

        res.json(updated);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    try {
        const { number, is_active } = await Class.findOne({
            number: req.params.id,
        });

        res.json({
            data: {
                number: number,
                is_active: is_active,
            },
        });
    } catch (err) {
        res.json({ message: err });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedPost = await Class.updateOne(
            { number: req.params.id },
            {
                $set: {
                    is_active: req.body.is_active,
                    ended_at: req.body.ended_at,
                },
            }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
