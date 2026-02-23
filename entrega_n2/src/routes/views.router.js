const express = require('express');

const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
    res.render('home');
})

module.exports = viewsRouter;