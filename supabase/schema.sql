-- TrackerX — Supabase Schema
-- Run this entire file in the Supabase SQL Editor (supabase.com → your project → SQL Editor)

-- ─── ENUM TYPES ───────────────────────────────────────────────────────────────

CREATE TYPE property_type  AS ENUM ('Farmhouse', 'House', 'Plots');
CREATE TYPE lead_source    AS ENUM ('Meta Ad', 'Referral', 'WhatsApp', 'Other');
CREATE TYPE buyer_type     AS ENUM ('Family', 'Investor', 'HNI', 'Unknown');
CREATE TYPE temperature    AS ENUM ('Hot', 'Warm', 'Cold');
CREATE TYPE lead_stage     AS ENUM (
  'New', 'Called', 'WhatsApp Sent', 'Interested',
  'Visit Scheduled', 'Visit Done', 'Negotiation', 'Closed', 'Dead'
);
CREATE TYPE objection_type AS ENUM (
  'Price', 'Location', 'Legality', 'Loan', 'Not Ready', 'None'
);
CREATE TYPE loan_interest  AS ENUM ('Yes', 'No', 'Unknown');

-- ─── SEQUENCE FOR LEAD_ID ─────────────────────────────────────────────────────

CREATE SEQUENCE IF NOT EXISTS lead_id_seq START 1;

-- ─── LEADS TABLE ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS leads (
  id             SERIAL PRIMARY KEY,
  lead_id        TEXT UNIQUE NOT NULL DEFAULT '',
  name           TEXT NOT NULL,
  phone          TEXT NOT NULL,
  date_added     DATE NOT NULL DEFAULT CURRENT_DATE,
  property_type  property_type NOT NULL DEFAULT 'Farmhouse',
  source         lead_source NOT NULL DEFAULT 'Meta Ad',
  buyer_type     buyer_type NOT NULL DEFAULT 'Unknown',
  temperature    temperature NOT NULL DEFAULT 'Warm',
  stage          lead_stage NOT NULL DEFAULT 'New',
  last_contacted DATE,
  follow_up_date DATE,
  objection      objection_type NOT NULL DEFAULT 'None',
  loan_interest  loan_interest NOT NULL DEFAULT 'Unknown',
  notes          TEXT DEFAULT '',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── AUTO-GENERATE LEAD_ID (L001, L002…) ─────────────────────────────────────

CREATE OR REPLACE FUNCTION generate_lead_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.lead_id := 'L' || LPAD(nextval('lead_id_seq')::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_lead_id
  BEFORE INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION generate_lead_id();

-- ─── AUTO-UPDATE updated_at ───────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
-- Solo use: allow all operations with the anon key.
-- When you add authentication later, replace this with user-scoped policies.

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for anon"
  ON leads FOR ALL
  USING (true)
  WITH CHECK (true);

-- ─── INDEXES ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_leads_follow_up_date ON leads(follow_up_date);
CREATE INDEX IF NOT EXISTS idx_leads_date_added     ON leads(date_added);
CREATE INDEX IF NOT EXISTS idx_leads_temperature    ON leads(temperature);
CREATE INDEX IF NOT EXISTS idx_leads_stage          ON leads(stage);

-- ─── IF TABLE ALREADY EXISTS: run these to add new columns ──────────────────
-- CREATE TYPE loan_interest AS ENUM ('Yes', 'No', 'Unknown');
-- ALTER TABLE leads ADD COLUMN IF NOT EXISTS loan_interest loan_interest NOT NULL DEFAULT 'Unknown';
-- CREATE TYPE property_type AS ENUM ('Farmhouse', 'House', 'Plots');
-- ALTER TABLE leads ADD COLUMN IF NOT EXISTS property_type property_type NOT NULL DEFAULT 'Farmhouse';

-- ─── ENABLE REALTIME (run separately if needed) ───────────────────────────────
-- Supabase Dashboard → Database → Replication → enable "leads" table
-- OR run:
-- ALTER PUBLICATION supabase_realtime ADD TABLE leads;
