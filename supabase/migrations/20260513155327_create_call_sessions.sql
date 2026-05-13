/*
  # Create call_sessions table

  Tracks each Vapi voice call session for analytics. Rows are created on
  call-start and updated with end timestamp / duration on call-end.

  1. New Tables
    - `call_sessions`
      - `id` (uuid, primary key)
      - `assistant_id` (text) — Vapi assistant id used
      - `industry_slug` (text, nullable) — page context (e.g., "plumbers")
      - `page_path` (text, nullable) — route the call started on
      - `started_at` (timestamptz, default now())
      - `ended_at` (timestamptz, nullable)
      - `duration_seconds` (integer, nullable)
      - `ended_reason` (text, nullable) — "user", "remote", "error"
      - `user_agent` (text, nullable)
  2. Security
    - Enable RLS on `call_sessions`
    - Allow anonymous INSERT (anonymous web visitors initiate calls)
    - Allow anonymous UPDATE (only their own row, by id, no auth context — restricted)
    - No SELECT for anon (analytics are read server-side only)
*/

CREATE TABLE IF NOT EXISTS call_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assistant_id text NOT NULL DEFAULT '',
  industry_slug text,
  page_path text,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  duration_seconds integer,
  ended_reason text,
  user_agent text
);

ALTER TABLE call_sessions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'call_sessions' AND policyname = 'Anyone can create a call session'
  ) THEN
    CREATE POLICY "Anyone can create a call session"
      ON call_sessions FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'call_sessions' AND policyname = 'Anyone can update unfinished call session'
  ) THEN
    CREATE POLICY "Anyone can update unfinished call session"
      ON call_sessions FOR UPDATE
      TO anon, authenticated
      USING (ended_at IS NULL)
      WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS call_sessions_started_at_idx ON call_sessions (started_at DESC);
