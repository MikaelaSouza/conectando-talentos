-- ============================================================
-- SCHEMA COMPLETO - Conectando Talentos
-- Cole este SQL no SQL Editor do Supabase e execute
-- ============================================================

-- Tabela de usuários (PcD e Empresas)
CREATE TABLE usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('pcd', 'empresa')),
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de currículos
CREATE TABLE curriculos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,

  -- Dados pessoais
  nome_completo TEXT NOT NULL,
  telefone TEXT,
  cidade TEXT,
  estado TEXT,
  linkedin TEXT,
  github TEXT,
  sobre_mim TEXT,

  -- Deficiência
  tipo_deficiencia TEXT,
  necessidades_especiais TEXT,

  -- Profissional
  objetivo TEXT,
  experiencias JSONB DEFAULT '[]',
  formacoes JSONB DEFAULT '[]',
  habilidades JSONB DEFAULT '[]',
  idiomas JSONB DEFAULT '[]',

  -- Visibilidade
  visivel_empresas BOOLEAN DEFAULT TRUE,

  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de perfis de empresa
CREATE TABLE empresas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  nome_empresa TEXT NOT NULL,
  cnpj TEXT,
  setor TEXT,
  cidade TEXT,
  estado TEXT,
  descricao TEXT,
  site TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de favoritos (empresa salva currículo)
CREATE TABLE favoritos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  curriculo_id UUID REFERENCES curriculos(id) ON DELETE CASCADE,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(empresa_id, curriculo_id)
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) - Segurança por linha
-- ============================================================

ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoritos ENABLE ROW LEVEL SECURITY;

-- Usuários só veem/editam seu próprio registro
CREATE POLICY "usuario_proprio" ON usuarios
  FOR ALL USING (id = auth.uid());

-- PcD só edita seu próprio currículo, empresas veem os visíveis
CREATE POLICY "curriculo_dono" ON curriculos
  FOR ALL USING (usuario_id = auth.uid());

CREATE POLICY "curriculo_visivel" ON curriculos
  FOR SELECT USING (visivel_empresas = TRUE);

-- Empresa só edita seu próprio perfil
CREATE POLICY "empresa_proprio" ON empresas
  FOR ALL USING (usuario_id = auth.uid());

-- ============================================================
-- ÍNDICES para performance
-- ============================================================
CREATE INDEX idx_curriculos_visivel ON curriculos(visivel_empresas);
CREATE INDEX idx_curriculos_usuario ON curriculos(usuario_id);
CREATE INDEX idx_curriculos_deficiencia ON curriculos(tipo_deficiencia);
CREATE INDEX idx_favoritos_empresa ON favoritos(empresa_id);
