const express = require('express');
const supabase = require('../supabase');
const autenticar = require('../middleware/auth');

const router = express.Router();

// GET /api/curriculos/meu — busca currículo do usuário logado
router.get('/meu', autenticar, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('curriculos')
      .select('*')
      .eq('usuario_id', req.usuario.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = não encontrado
    res.json(data || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar currículo.' });
  }
});

// POST /api/curriculos — cria ou atualiza currículo
router.post('/', autenticar, async (req, res) => {
  if (req.usuario.tipo !== 'pcd') {
    return res.status(403).json({ erro: 'Apenas usuários PcD podem criar currículos.' });
  }

  const campos = { ...req.body, usuario_id: req.usuario.id, atualizado_em: new Date() };

  try {
    // Upsert: cria se não existe, atualiza se já existe
    const { data, error } = await supabase
      .from('curriculos')
      .upsert(campos, { onConflict: 'usuario_id' })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao salvar currículo.' });
  }
});

// GET /api/curriculos — lista pública para empresas (com filtros)
router.get('/', autenticar, async (req, res) => {
  if (req.usuario.tipo !== 'empresa') {
    return res.status(403).json({ erro: 'Apenas empresas podem buscar currículos.' });
  }

  const { deficiencia, cidade, habilidade } = req.query;

  try {
    let query = supabase
      .from('curriculos')
      .select('id, nome_completo, cidade, estado, tipo_deficiencia, objetivo, habilidades, idiomas, sobre_mim')
      .eq('visivel_empresas', true);

    if (deficiencia) query = query.eq('tipo_deficiencia', deficiencia);
    if (cidade) query = query.ilike('cidade', `%${cidade}%`);

    const { data, error } = await query.order('atualizado_em', { ascending: false });
    if (error) throw error;

    // Filtro por habilidade (feito em JS pois é JSONB)
    let resultado = data;
    if (habilidade) {
      resultado = data.filter(c =>
        Array.isArray(c.habilidades) &&
        c.habilidades.some(h => h.toLowerCase().includes(habilidade.toLowerCase()))
      );
    }

    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar currículos.' });
  }
});

// GET /api/curriculos/:id — detalhe de um currículo (para empresa)
router.get('/:id', autenticar, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('curriculos')
      .select('*')
      .eq('id', req.params.id)
      .eq('visivel_empresas', true)
      .single();

    if (error) return res.status(404).json({ erro: 'Currículo não encontrado.' });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar currículo.' });
  }
});

module.exports = router;
