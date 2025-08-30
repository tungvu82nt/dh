-- Supabase Database Schema - Phiên bản đơn giản để test nhanh
-- Copy và paste vào Supabase SQL Editor

-- Tạo bảng shipping_forms
CREATE TABLE IF NOT EXISTS shipping_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_phone TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_weight DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo bảng user_settings
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'anonymous',
  language TEXT NOT NULL DEFAULT 'vi',
  theme TEXT NOT NULL DEFAULT 'light',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo indexes
CREATE INDEX IF NOT EXISTS idx_forms_created ON shipping_forms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_settings_user ON user_settings(user_id);

-- Cho phép truy cập công khai (cho testing)
ALTER TABLE shipping_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Tạo policies đơn giản
CREATE POLICY "allow_all_forms" ON shipping_forms FOR ALL USING (true);
CREATE POLICY "allow_all_settings" ON user_settings FOR ALL USING (true);

-- Grant permissions
GRANT ALL ON shipping_forms TO anon, authenticated;
GRANT ALL ON user_settings TO anon, authenticated;
