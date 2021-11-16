import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1> 🤖 ...server is up!</h1>');
});

module.exports = router;