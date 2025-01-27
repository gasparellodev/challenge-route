/*
  # Create routes table and policies

  1. New Tables
    - `routes`
      - `id` (uuid, primary key)
      - `origin` (text)
      - `destination` (text)
      - `price` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `routes` table
    - Add policies for authenticated users to perform CRUD operations
*/

CREATE TABLE IF NOT EXISTS routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origin text NOT NULL,
  destination text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  created_at timestamptz DEFAULT now(),
  UNIQUE(origin, destination)
);

ALTER TABLE routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to all users"
  ON routes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to authenticated users"
  ON routes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow update access to authenticated users"
  ON routes
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow delete access to authenticated users"
  ON routes
  FOR DELETE
  TO authenticated
  USING (true);