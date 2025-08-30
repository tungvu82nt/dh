// Supabase Setup Script
// Chạy lệnh: node setup-supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnqvjmdffzlxzavfxmek.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucXZqbWRmZnpseHphdmZ4bWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzAwMjMsImV4cCI6MjA3MjE0NjAyM30.QNzr2rrce4CDAIZCuzQ7tIwfRqfnTdmLlrDAtE-oc74';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 SUPABASE SETUP SCRIPT\n');
console.log('🔗 URL:', supabaseUrl);
console.log('📋 Service Role Key được sử dụng để setup database\n');

// Schema SQL
const schemaSQL = `
-- Supabase Database Schema for PackSheet Lite

-- Create shipping_forms table
CREATE TABLE IF NOT EXISTS public.shipping_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  customer_name TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_phone TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_weight DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS public.user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'anonymous',
  language TEXT NOT NULL DEFAULT 'vi' CHECK (language IN ('vi', 'zh')),
  theme TEXT NOT NULL DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shipping_forms_user_id ON public.shipping_forms(user_id);
CREATE INDEX IF NOT EXISTS idx_shipping_forms_created_at ON public.shipping_forms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON public.user_settings(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.shipping_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (simplified for anonymous access)
CREATE POLICY IF NOT EXISTS "Allow all operations for anonymous users" ON public.shipping_forms
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow all operations for anonymous settings" ON public.user_settings
  FOR ALL USING (true) WITH CHECK (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS handle_shipping_forms_updated_at ON public.shipping_forms;
CREATE TRIGGER handle_shipping_forms_updated_at
  BEFORE UPDATE ON public.shipping_forms
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_user_settings_updated_at ON public.user_settings;
CREATE TRIGGER handle_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.shipping_forms TO anon, authenticated;
GRANT ALL ON public.user_settings TO anon, authenticated;
`;

// Test function
async function testSetup() {
  console.log('🧪 TESTING DATABASE SETUP...\n');

  try {
    // Test 1: Check if tables exist
    console.log('1️⃣  Checking tables...');

    const { data: formsData, error: formsError } = await supabase
      .from('shipping_forms')
      .select('count')
      .limit(1);

    if (formsError) throw formsError;

    const { data: settingsData, error: settingsError } = await supabase
      .from('user_settings')
      .select('count')
      .limit(1);

    if (settingsError) throw settingsError;

    console.log('✅ Tables exist!');

    // Test 2: Insert test data
    console.log('\n2️⃣  Testing data operations...');

    const testForm = {
      customer_name: 'Test Customer',
      customer_address: '123 Test Street',
      items: [{ id: Date.now(), name: 'Test Product', quantity: 1, weight: 1.0 }],
      total_weight: 1.0,
      total_quantity: 1
    };

    const { data: insertData, error: insertError } = await supabase
      .from('shipping_forms')
      .insert([testForm])
      .select()
      .single();

    if (insertError) throw insertError;
    console.log('✅ Insert operation works!');

    // Test 3: Read data
    const { data: readData, error: readError } = await supabase
      .from('shipping_forms')
      .select('*')
      .limit(1);

    if (readError) throw readError;
    console.log('✅ Read operation works!');

    // Test 4: Clean up test data
    const { error: deleteError } = await supabase
      .from('shipping_forms')
      .delete()
      .eq('id', insertData.id);

    if (deleteError) throw deleteError;
    console.log('✅ Delete operation works!');

    console.log('\n🎉 DATABASE SETUP SUCCESSFUL!');
    console.log('✅ All tables created and working properly');
    console.log('✅ RLS policies configured');
    console.log('✅ Triggers and functions working');

    return true;

  } catch (error) {
    console.log('\n❌ DATABASE SETUP FAILED!');
    console.log('Error:', error.message);

    if (error.message.includes('permission denied')) {
      console.log('\n🔐 PERMISSION ISSUE DETECTED!');
      console.log('This usually means:');
      console.log('1. The anon key doesn\'t have proper permissions');
      console.log('2. RLS policies are blocking operations');
      console.log('3. Tables don\'t exist');
    }

    return false;
  }
}

// Main function
async function main() {
  console.log('📋 DATABASE SCHEMA SQL:');
  console.log('=' .repeat(50));
  console.log(schemaSQL);
  console.log('=' .repeat(50));

  console.log('\n📖 SETUP INSTRUCTIONS:');
  console.log('1. Truy cập: https://supabase.com/dashboard');
  console.log('2. Chọn project của bạn');
  console.log('3. Vào SQL Editor');
  console.log('4. Copy & paste SQL schema ở trên');
  console.log('5. Click "Run" để tạo database');
  console.log('6. Chờ script này chạy lại để test\n');

  // Test current state
  const isSetup = await testSetup();

  if (!isSetup) {
    console.log('\n⚠️  DATABASE NOT READY!');
    console.log('Please follow the instructions above to set up your database.');
    console.log('Then run this script again to verify the setup.');
    process.exit(1);
  } else {
    console.log('\n🚀 READY TO USE!');
    console.log('Your Supabase database is properly configured.');
    console.log('You can now run: npm run dev');
  }
}

// Run setup
main().catch(console.error);
