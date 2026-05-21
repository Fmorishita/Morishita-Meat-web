-- ============================================================
-- MORISHITA MEAT — Supabase Setup
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Tabla de contactos / solicitudes del formulario web
CREATE TABLE IF NOT EXISTS contactos (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre     TEXT        NOT NULL,
  telefono   TEXT        NOT NULL,
  tipo       TEXT        DEFAULT 'consumidor' CHECK (tipo IN ('consumidor', 'chef')),
  mensaje    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para consultar por fecha (útil en el dashboard)
CREATE INDEX IF NOT EXISTS contactos_created_at_idx ON contactos (created_at DESC);

-- Row Level Security: el sitio solo puede insertar, no leer ni borrar
ALTER TABLE contactos ENABLE ROW LEVEL SECURITY;

-- Política: cualquier visitante (anon) puede insertar un contacto
CREATE POLICY "Permitir inserts desde el sitio web"
  ON contactos FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política: solo usuarios autenticados (tú en el dashboard) pueden leer
CREATE POLICY "Solo admin puede ver contactos"
  ON contactos FOR SELECT
  TO authenticated
  USING (true);
