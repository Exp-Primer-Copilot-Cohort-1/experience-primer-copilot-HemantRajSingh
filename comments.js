// create web server for comment
const express = require('express');
const router = express.Router();
const db = require('../db');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', (req, res) => {
    res.send('Comments');
});

router.post('/add', urlencodedParser, (req, res) => {
    const { comment, user_id, post_id } = req.body;
    const sql = 'INSERT INTO comments (comment, user_id, post_id) VALUES (?, ?, ?)';
    db.query(sql, [comment, user_id, post_id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/get', (req, res) => {
    const { post_id } = req.query;
    const sql = 'SELECT * FROM comments WHERE post_id = ?';
    db.query(sql, [post_id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

module.exports = router;