const jwt = require('jsonwebtoken');

module.exports = function autenticar(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; // { id, email, tipo }
    next();
  } catch {
    return res.status(403).json({ erro: 'Token inválido ou expirado.' });
  }
};
