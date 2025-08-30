// Script sửa Row Level Security policies
import pkg from 'pg';
const { Client } = pkg;

console.log('🔧 SỬA ROW LEVEL SECURITY POLICIES...\n');

// Thông tin kết nối
const connectionString = 'postgresql://postgres.lnqvjmdffzlxzavfxmek:Donhang1@@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString: connectionString,
});

async function fixPolicies() {
  try {
    console.log('🔌 Kết nối đến PostgreSQL...');
    await client.connect();
    console.log('✅ Kết nối thành công!\n');

    // Disable RLS temporarily để test
    console.log('📋 Tắt RLS tạm thời...');
    await client.query('ALTER TABLE shipping_forms DISABLE ROW LEVEL SECURITY;');
    await client.query('ALTER TABLE user_settings DISABLE ROW LEVEL SECURITY;');
    console.log('✅ Đã tắt RLS\n');

    // Xóa policies cũ nếu có
    console.log('🗑️  Xóa policies cũ...');
    try {
      await client.query('DROP POLICY IF EXISTS "allow_all_forms" ON shipping_forms;');
      await client.query('DROP POLICY IF EXISTS "allow_all_settings" ON user_settings;');
    } catch (error) {
      console.log('⚠️  Không có policies cũ để xóa');
    }

    // Tạo policies mới
    console.log('📝 Tạo policies mới...');
    await client.query(`
      CREATE POLICY "allow_all_forms" ON shipping_forms
      FOR ALL USING (true) WITH CHECK (true);
    `);

    await client.query(`
      CREATE POLICY "allow_all_settings" ON user_settings
      FOR ALL USING (true) WITH CHECK (true);
    `);

    console.log('✅ Đã tạo policies mới\n');

    // Bật lại RLS
    console.log('🔒 Bật lại RLS...');
    await client.query('ALTER TABLE shipping_forms ENABLE ROW LEVEL SECURITY;');
    await client.query('ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;');
    console.log('✅ Đã bật RLS\n');

    // Grant permissions
    console.log('🔑 Grant permissions...');
    await client.query('GRANT ALL ON shipping_forms TO anon, authenticated;');
    await client.query('GRANT ALL ON user_settings TO anon, authenticated;');
    console.log('✅ Đã grant permissions\n');

    console.log('🎉 POLICIES ĐÃ ĐƯỢC SỬA!');
    console.log('🚀 Sẵn sàng test lại');

  } catch (error) {
    console.log('❌ LỖI KHI SỬA POLICIES:');
    console.log(error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Đã đóng kết nối PostgreSQL');
  }
}

fixPolicies();
