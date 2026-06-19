-- ============================================
-- Box2Home - SCHEMA COMPLETO
-- ============================================

-- EXTENSÃO UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELAS PRINCIPAIS
-- ============================================

-- Perfis de usuário (estende auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('gestor', 'motorista')),
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rotas de entrega
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gestor_id UUID NOT NULL REFERENCES profiles(id),
  driver_id UUID NOT NULL REFERENCES profiles(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'pendente' 
    CHECK (status IN ('pendente', 'em_andamento', 'concluida')),
  observations TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Entregas
CREATE TABLE deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
  recipient_name TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DECIMAL NOT NULL,
  lng DECIMAL NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pendente' 
    CHECK (status IN ('pendente', 'em_andamento', 'entregue', 'problema')),
  delivered_at TIMESTAMPTZ,
  problem_reason TEXT,
  proof_photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Localização em tempo real (buffer)
CREATE TABLE driver_locations (
  driver_id UUID PRIMARY KEY REFERENCES profiles(id),
  route_id UUID NOT NULL REFERENCES routes(id),
  lat DECIMAL NOT NULL,
  lng DECIMAL NOT NULL,
  battery_level INTEGER,
  speed DECIMAL,
  last_update TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ÍNDICES
-- ============================================
CREATE INDEX idx_routes_driver ON routes(driver_id, date);
CREATE INDEX idx_routes_gestor ON routes(gestor_id, date);
CREATE INDEX idx_deliveries_route ON deliveries(route_id);
CREATE INDEX idx_deliveries_status ON deliveries(status);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Atualiza updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Trigger para routes
CREATE TRIGGER update_routes_updated_at
  BEFORE UPDATE ON routes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Trigger para deliveries
CREATE TRIGGER update_deliveries_updated_at
  BEFORE UPDATE ON deliveries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Auto-limpeza de localizações (30 dias)
CREATE OR REPLACE FUNCTION cleanup_old_locations()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM driver_locations 
  WHERE last_update < NOW() - INTERVAL '30 days';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Cria perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Usuário'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'motorista')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilita RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_locations ENABLE ROW LEVEL SECURITY;

-- POLICIES: PROFILES
-- Usuários podem ver seus próprios perfis
CREATE POLICY "Usuários veem próprio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Gestores podem ver todos os perfis
CREATE POLICY "Gestores veem todos perfis" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'gestor'
    )
  );

-- Usuários podem atualizar próprio perfil
CREATE POLICY "Usuários atualizam próprio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- POLICIES: ROUTES
-- Gestores podem ver todas as rotas
CREATE POLICY "Gestores veem todas rotas" ON routes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'gestor'
    )
  );

-- Motoristas veem apenas suas rotas
CREATE POLICY "Motoristas veem próprias rotas" ON routes
  FOR SELECT USING (driver_id = auth.uid());

-- Gestores podem criar rotas
CREATE POLICY "Gestores criam rotas" ON routes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'gestor'
    )
  );

-- Gestores podem atualizar rotas
CREATE POLICY "Gestores atualizam rotas" ON routes
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'gestor'
    )
  );

-- POLICIES: DELIVERIES
-- Gestores veem todas as entregas
CREATE POLICY "Gestores veem todas entregas" ON deliveries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'gestor'
    )
  );

-- Motoristas veem entregas de suas rotas
CREATE POLICY "Motoristas veem suas entregas" ON deliveries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM routes
      WHERE routes.id = deliveries.route_id
      AND routes.driver_id = auth.uid()
    )
  );

-- Motoristas podem atualizar status das entregas
CREATE POLICY "Motoristas atualizam entregas" ON deliveries
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM routes
      WHERE routes.id = deliveries.route_id
      AND routes.driver_id = auth.uid()
    )
  );

-- POLICIES: DRIVER LOCATIONS
-- Todos podem ver localizações (gestores + próprio motorista)
CREATE POLICY "Visualização de localizações" ON driver_locations
  FOR SELECT USING (
    auth.uid() = driver_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'gestor'
    )
  );

-- Motoristas podem inserir/atualizar sua localização
CREATE POLICY "Motoristas atualizam localização" ON driver_locations
  FOR INSERT WITH CHECK (auth.uid() = driver_id);

CREATE POLICY "Motoristas upsert localização" ON driver_locations
  FOR UPDATE USING (auth.uid() = driver_id);

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Bucket para fotos de comprovante
INSERT INTO storage.buckets (id, name, public) 
VALUES ('delivery_proofs', 'delivery_proofs', true);

-- RLS para storage
CREATE POLICY "Usuários autenticados podem fazer upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'delivery_proofs' AND auth.role() = 'authenticated');

CREATE POLICY "Fotos são públicas para visualização"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'delivery_proofs');

-- ============================================
-- DADOS DE EXEMPLO
-- ============================================

-- Insere alguns perfis de exemplo (após criar usuários no Auth)
-- NOTA: Execute após criar usuários no painel do Supabase
/*
INSERT INTO profiles (id, name, role, phone) VALUES
  ('[ID_DO_GESTOR]', 'Murilo Gestor', 'gestor', '(18) 99999-0001'),
  ('[ID_DO_MOTORISTA]', 'João Motorista', 'motorista', '(18) 99999-0002');
*/