const express = require('express');
const puppeteer = require('puppeteer');
const supabase = require('../supabase');
const autenticar = require('../middleware/auth');

const router = express.Router();

// GET /api/pdf/meu — gera PDF do currículo do usuário logado
router.get('/meu', autenticar, async (req, res) => {
  try {
    const { data: curriculo, error } = await supabase
      .from('curriculos')
      .select('*')
      .eq('usuario_id', req.usuario.id)
      .single();

    if (error || !curriculo) {
      return res.status(404).json({ erro: 'Currículo não encontrado.' });
    }

    const html = gerarHTMLCurriculo(curriculo);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: 'new'
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="curriculo-${curriculo.nome_completo.replace(/\s/g, '_')}.pdf"`);
    res.send(pdf);

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao gerar PDF.' });
  }
});

function gerarHTMLCurriculo(c) {
  const experiencias = (c.experiencias || []).map(e => `
    <div class="item">
      <strong>${e.cargo}</strong> — ${e.empresa}
      <span class="periodo">${e.periodo || ''}</span>
      <p>${e.descricao || ''}</p>
    </div>
  `).join('');

  const formacoes = (c.formacoes || []).map(f => `
    <div class="item">
      <strong>${f.curso}</strong> — ${f.instituicao}
      <span class="periodo">${f.periodo || ''}</span>
    </div>
  `).join('');

  const habilidades = (c.habilidades || []).join(' • ');
  const idiomas = (c.idiomas || []).map(i => `${i.idioma} (${i.nivel})`).join(' • ');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; font-size: 13px; line-height: 1.6; }
    header { background: #1a5276; color: white; padding: 24px; border-radius: 4px 4px 0 0; }
    header h1 { font-size: 24px; margin-bottom: 4px; }
    header p { font-size: 12px; opacity: 0.85; }
    .contato { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px; font-size: 12px; }
    main { padding: 20px 0; }
    .secao { margin-bottom: 20px; }
    .secao h2 { font-size: 14px; color: #1a5276; border-bottom: 2px solid #1a5276; padding-bottom: 4px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .item { margin-bottom: 12px; }
    .item strong { display: block; }
    .periodo { color: #666; font-size: 11px; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag { background: #e8f0fe; color: #1a5276; padding: 3px 10px; border-radius: 12px; font-size: 11px; }
    .badge-deficiencia { display: inline-block; background: #d5f5e3; color: #1e8449; padding: 4px 12px; border-radius: 12px; font-size: 11px; margin-top: 8px; }
    p { margin-top: 4px; color: #444; }
  </style>
</head>
<body>
  <header>
    <h1>${c.nome_completo}</h1>
    ${c.objetivo ? `<p>${c.objetivo}</p>` : ''}
    <div class="contato">
      ${c.telefone ? `<span>📞 ${c.telefone}</span>` : ''}
      ${c.cidade ? `<span>📍 ${c.cidade}, ${c.estado || ''}</span>` : ''}
      ${c.linkedin ? `<span>🔗 ${c.linkedin}</span>` : ''}
    </div>
    ${c.tipo_deficiencia ? `<span class="badge-deficiencia">♿ ${c.tipo_deficiencia}</span>` : ''}
  </header>

  <main>
    ${c.sobre_mim ? `<div class="secao"><h2>Sobre mim</h2><p>${c.sobre_mim}</p></div>` : ''}

    ${experiencias ? `<div class="secao"><h2>Experiência Profissional</h2>${experiencias}</div>` : ''}

    ${formacoes ? `<div class="secao"><h2>Formação Acadêmica</h2>${formacoes}</div>` : ''}

    ${habilidades ? `<div class="secao"><h2>Habilidades</h2><div class="tags">${(c.habilidades||[]).map(h=>`<span class="tag">${h}</span>`).join('')}</div></div>` : ''}

    ${idiomas ? `<div class="secao"><h2>Idiomas</h2><p>${idiomas}</p></div>` : ''}

    ${c.necessidades_especiais ? `<div class="secao"><h2>Necessidades de Acessibilidade</h2><p>${c.necessidades_especiais}</p></div>` : ''}
  </main>
</body>
</html>`;
}

module.exports = router;
