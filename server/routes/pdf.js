const express = require('express');
const router = express.Router();

// PDF gerado no frontend com jsPDF
router.get('/meu', (req, res) => {
  res.status(410).json({ erro: 'PDF gerado no navegador.' });
});

module.exports = router;
