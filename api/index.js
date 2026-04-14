require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('../server/routes/auth');
const curriculoRoutes = require('../server/routes/curriculos');
const empresaRoutes = require('../server/routes/empresas');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/curriculos', curriculoRoutes);
app.use('/api/empresas', empresaRoutes);

// PDF agora é gerado no frontend
app.get('/api/pdf/meu', (req, res) => {
  res.status(410).json({ erro: 'PDF gerado no navegador.' });
});

module.exports = app;
