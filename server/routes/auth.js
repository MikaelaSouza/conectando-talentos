const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../supabase');

const router = express.Router();

// POST /api/auth/cadastro
router.post('/cadastro', async (req, res) => {
  const { email, senha, tipo } = req.body;

  if (!email || !senha || !tipo) {
    return res.status(400).json({ erro: 'email, senha e tipo são obrigatórios.' });
  }
  if (!['pcd', 'empresa'].includes(tipo)) {
    return res.status(400).json({ erro: 'tipo deve ser "pcd" ou "empresa".' });
  }

  try {
    const { cpf, cnpj } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);

    const { data, error } = await supabase
      .from('usuarios')
      .insert({ email, senha_hash: senhaHash, tipo, cpf: cpf||null, cnpj: cnpj||null })
      .select('id, email, tipo')
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ erro: 'E-mail já cadastrado.' });
      }
      throw error;
    }

    const token = jwt.sign(
      { id: data.id, email: data.email, tipo: data.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, usuario: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'email e senha são obrigatórios.' });
  }

  try {
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('id, email, tipo, senha_hash')
      .eq('email', email)
      .single();

    if (error || !usuario) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      usuario: { id: usuario.id, email: usuario.email, tipo: usuario.tipo }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

module.exports = router;
