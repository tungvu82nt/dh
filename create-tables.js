// Script tạo tables tự động
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnqvjmdffzlxzavfxmek.supabase.co';
// Sử dụng service_role key để tạo tables (nếu có)
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucXZqbWRmZnpseHphdmZ4bWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzAwMjMsImV4cCI6MjA3MjE0NjAyM30.QNzr2rrce4CDAIZCuzQ7tIwfRqfnTdmLlrDAtE-oc74';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createTables() {
  console.log('🔨 TẠO DATABASE TABLES...\n');

  try {
    // Tạo bảng shipping_forms
    console.log('📦 Tạo bảng shipping_forms...');
    const { error: formsError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (formsError) {
      console.log('❌ Không thể tạo bảng shipping_forms:', formsError.message);
    } else {
      console.log('✅ Bảng shipping_forms đã tạo!');
    }

    // Tạo bảng user_settings
    console.log('⚙️  Tạo bảng user_settings...');
    const { error: settingsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS user_settings (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id TEXT NOT NULL DEFAULT 'anonymous',
          language TEXT NOT NULL DEFAULT 'vi',
          theme TEXT NOT NULL DEFAULT 'light',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (settingsError) {
      console.log('❌ Không thể tạo bảng user_settings:', settingsError.message);
    } else {
      console.log('✅ Bảng user_settings đã tạo!');
    }

    // Test tables
    console.log('\n🧪 TEST TABLES...');
    const { data: testData, error: testError } = await supabase
      .from('shipping_forms')
      .select('*')
      .limit(1);

    if (testError) {
      console.log('❌ Test thất bại:', testError.message);
      console.log('💡 Vui lòng tạo tables thủ công qua Supabase Dashboard');
    } else {
      console.log('✅ Tables hoạt động tốt!');
      console.log('🎉 Sẵn sàng sử dụng Supabase!');
    }

  } catch (error) {
    console.log('❌ Lỗi:', error.message);
    console.log('\n📋 HƯỚNG DẪN THỦ CÔNG:');
    console.log('1. Vào https://supabase.com/dashboard');
    console.log('2. Chọn project lnqvjmdffzlxzavfxmek');
    console.log('3. Vào SQL Editor');
    console.log('4. Copy & paste nội dung file supabase-schema-simple.sql');
    console.log('5. Click Run');
  }
}

createTables();
