const express = require('express');
const router = express.Router();

const path = require('path');

// Importando os roteadores separados
const apiRouter = require('./api_router');
const pagesRouter = require('./pages_router');

// Usando os roteadores
router.use('/api', apiRouter);  // Todas as rotas da api comecarão com /api

router.use('/', pagesRouter);  // Todas as rotas das paginas web

module.exports = router;
