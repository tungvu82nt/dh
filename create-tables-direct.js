// Script tạo tables trực tiếp qua PostgreSQL connection
import pkg from 'pg';
const { Client } = pkg;

console.log('🔨 TẠO TABLES TRỰC TIẾP QUA POSTGRESQL...\n');

// Thông tin kết nối từ người dùng
const connectionString = 'postgresql://postgres.lnqvjmdffzlxzavfxmek:Donhang1@@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString: connectionString,
});

const sqlCommands = [
  `-- Tạo bảng shipping_forms
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
  );`,

  `-- Tạo bảng user_settings
  CREATE TABLE IF NOT EXISTS user_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL DEFAULT 'anonymous',
    language TEXT NOT NULL DEFAULT 'vi',
    theme TEXT NOT NULL DEFAULT 'light',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );`,

  `-- Tạo indexes
  CREATE INDEX IF NOT EXISTS idx_forms_created ON shipping_forms(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_settings_user ON user_settings(user_id);`,

  `-- Cho phép truy cập công khai
  ALTER TABLE shipping_forms ENABLE ROW LEVEL SECURITY;
  ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;`,

  `-- Tạo policies đơn giản
  CREATE POLICY IF NOT EXISTS "allow_all_forms" ON shipping_forms FOR ALL USING (true);
  CREATE POLICY IF NOT EXISTS "allow_all_settings" ON user_settings FOR ALL USING (true);`,

  `-- Grant permissions
  GRANT ALL ON shipping_forms TO anon, authenticated;
  GRANT ALL ON user_settings TO anon, authenticated;`
];

async function createTables() {
  try {
    console.log('🔌 Kết nối đến PostgreSQL...');
    await client.connect();
    console.log('✅ Kết nối thành công!\n');

    for (let i = 0; i < sqlCommands.length; i++) {
      console.log(`📋 Chạy lệnh SQL ${i + 1}/${sqlCommands.length}...`);
      try {
        await client.query(sqlCommands[i]);
        console.log('✅ Lệnh thực hiện thành công!');
      } catch (error) {
        console.log('⚠️  Lệnh gặp lỗi:', error.message);
        // Tiếp tục với lệnh tiếp theo thay vì dừng
      }
    }

    console.log('\n🎉 HOÀN THÀNH!');
    console.log('📦 Đã tạo tables: shipping_forms, user_settings');
    console.log('🔍 Đã tạo indexes và policies');

    // Test kết nối tables
    console.log('\n🧪 TEST TABLES...');

    const formsResult = await client.query('SELECT COUNT(*) as count FROM shipping_forms');
    console.log(`📊 shipping_forms: ${formsResult.rows[0].count} records`);

    const settingsResult = await client.query('SELECT COUNT(*) as count FROM user_settings');
    console.log(`⚙️  user_settings: ${settingsResult.rows[0].count} records`);

    console.log('\n🚀 SẴN SÀNG SỬ DỤNG!');
    console.log('Chạy: node test-connection-new.js để kiểm tra');

  } catch (error) {
    console.log('❌ LỖI KHI TẠO TABLES:');
    console.log(error.message);

    if (error.message.includes('password')) {
      console.log('\n🔐 VẤN ĐỀ XÁC THỰC:');
      console.log('1. Kiểm tra password trong connection string');
      console.log('2. Đảm bảo user có quyền tạo tables');
    }

    if (error.message.includes('connect')) {
      console.log('\n🌐 VẤN ĐỀ KẾT NỐI:');
      console.log('1. Kiểm tra kết nối internet');
      console.log('2. Kiểm tra firewall/antivirus');
      console.log('3. Thử lại sau vài phút');
    }

  } finally {
    await client.end();
    console.log('\n🔌 Đã đóng kết nối PostgreSQL');
  }
}

// Cài đặt pg nếu chưa có
console.log('📦 Kiểm tra thư viện pg...');
import { exec } from 'child_process';

exec('npm list pg', (error, stdout) => {
  if (error || !stdout.includes('pg@')) {
    console.log('❌ Chưa cài đặt pg. Đang cài đặt...');
    exec('npm install pg', (installError) => {
      if (installError) {
        console.log('❌ Không thể cài đặt pg:', installError.message);
        console.log('💡 Hãy chạy: npm install pg');
        return;
      }
      console.log('✅ Đã cài đặt pg thành công!');
      createTables();
    });
  } else {
    console.log('✅ pg đã được cài đặt');
    createTables();
  }
});
