const express = require('express');
const router = express.Router();

router.get('/post', (req, res) => {
    res.send("Hello, je viens du fichier post.js");
})

module.exports = router;
