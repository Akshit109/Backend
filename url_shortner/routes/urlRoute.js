const { generateUrl } = require('../Controller/urlController');
const express = require('express');
const router = express.Router();

router.post('/url', generateUrl);

module.exports = {router};