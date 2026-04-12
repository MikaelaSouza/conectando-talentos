const express = require('express');
const supabase = require('../supabase');
const autenticar = require('../middleware/auth');

const router = express.Router();

// Busca ou cria automaticamente o perfil da empresa
async function getOuCriarEmpresa(usuario_id, email) {
  const { data: existente } = await supabase
    .from('empresas')
    .select('id')
    .eq('usuario_id', usuario_id)
    .single();

  if (existente) return existente;

  // Cria perfil mínimo automaticamente
  const { data: novo, error } = await supabase
    .from('empresas')
    .insert({ usuario_id, nome_empresa: email || 'Empresa' })
    .select('id')
    .single();

  if (error) throw error;
  return novo;
}

// GET /api/empresas/meu
router.get('/meu', autenticar, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('empresas')
      .select('*')
      .eq('usuario_id', req.usuario.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    res.json(data || null);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar perfil.' });
  }
});

// POST /api/empresas
router.post('/', autenticar, async (req, res) => {
  if (req.usuario.tipo !== 'empresa') {
    return res.status(403).json({ erro: 'Apenas empresas podem criar perfil de empresa.' });
  }
  const campos = { ...req.body, usuario_id: req.usuario.id };
  try {
    const { data, error } = await supabase
      .from('empresas')
      .upsert(campos, { onConflict: 'usuario_id' })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao salvar perfil.' });
  }
});

// POST /api/empresas/favoritos/:curriculoId
router.post('/favoritos/:curriculoId', autenticar, async (req, res) => {
  if (req.usuario.tipo !== 'empresa') {
    return res.status(403).json({ erro: 'Apenas empresas podem favoritar.' });
  }
  try {
    const empresa = await getOuCriarEmpresa(req.usuario.id, req.usuario.email);

    const { error } = await supabase
      .from('favoritos')
      .insert({ empresa_id: empresa.id, curriculo_id: req.params.curriculoId });

    if (error && error.code === '23505') {
      return res.status(409).json({ erro: 'Já está nos favoritos.' });
    }
    if (error) throw error;
    res.status(201).json({ mensagem: 'Adicionado aos favoritos.' });
  } catch (err) {
    console.error('Erro favoritar:', err);
    res.status(500).json({ erro: 'Erro ao favoritar.' });
  }
});

// DELETE /api/empresas/favoritos/:curriculoId — desfavoritar
router.delete('/favoritos/:curriculoId', autenticar, async (req, res) => {
  console.log('[DELETE favorito] curriculoId:', req.params.curriculoId, '| usuario:', req.usuario?.id);
  if (req.usuario.tipo !== 'empresa') {
    return res.status(403).json({ erro: 'Apenas empresas podem desfavoritar.' });
  }
  try {
    const empresa = await getOuCriarEmpresa(req.usuario.id, req.usuario.email);

    const { error } = await supabase
      .from('favoritos')
      .delete()
      .eq('empresa_id', empresa.id)
      .eq('curriculo_id', req.params.curriculoId);

    if (error) throw error;
    res.json({ mensagem: 'Removido dos favoritos.' });
  } catch (err) {
    console.error('Erro desfavoritar:', err);
    res.status(500).json({ erro: 'Erro ao desfavoritar.' });
  }
});

// GET /api/empresas/favoritos
router.get('/favoritos', autenticar, async (req, res) => {
  try {
    const empresa = await getOuCriarEmpresa(req.usuario.id, req.usuario.email);

    const { data, error } = await supabase
      .from('favoritos')
      .select('curriculo_id, curriculos(nome_completo, cidade, estado, tipo_deficiencia, objetivo, habilidades)')
      .eq('empresa_id', empresa.id);

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Erro favoritos:', err);
    res.status(500).json({ erro: 'Erro ao buscar favoritos.' });
  }
});

module.exports = router;
