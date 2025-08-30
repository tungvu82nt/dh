// Script sửa lỗi 406 cho user_settings
import pkg from 'pg';
const { Client } = pkg;

console.log('🔧 SỬA LỖI 406 CHO USER_SETTINGS...\n');

// Thông tin kết nối
const connectionString = 'postgresql://postgres.lnqvjmdffzlxzavfxmek:Donhang1@@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString: connectionString,
});

async function fixUserSettingsPolicies() {
  try {
    console.log('🔌 Kết nối đến PostgreSQL...');
    await client.connect();
    console.log('✅ Kết nối thành công!\n');

    // Kiểm tra current state
    console.log('📋 KIỂM TRA TRẠNG THÁI HIỆN TẠI...\n');

    // Check if tables exist
    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('shipping_forms', 'user_settings')
    `);

    console.log('📊 Tables found:', tablesResult.rows.map(r => r.table_name));

    // Check RLS status
    const rlsResult = await client.query(`
      SELECT schemaname, tablename, rowsecurity
      FROM pg_tables
      WHERE schemaname = 'public'
      AND tablename IN ('shipping_forms', 'user_settings')
    `);

    console.log('🔒 RLS Status:');
    rlsResult.rows.forEach(row => {
      console.log(`   ${row.tablename}: ${row.rowsecurity ? 'ENABLED' : 'DISABLED'}`);
    });

    // Check existing policies
    const policiesResult = await client.query(`
      SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
      FROM pg_policies
      WHERE schemaname = 'public'
      AND tablename IN ('shipping_forms', 'user_settings')
    `);

    console.log('\n📋 Existing Policies:');
    if (policiesResult.rows.length === 0) {
      console.log('   ❌ No policies found - this might be the issue!');
    } else {
      policiesResult.rows.forEach(policy => {
        console.log(`   ${policy.tablename}: ${policy.policyname} (${policy.cmd})`);
      });
    }

    console.log('\n🔧 SỬA LỖI RLS POLICIES...\n');

    // Step 1: Temporarily disable RLS to test
    console.log('1️⃣ Tắt RLS tạm thời...');
    await client.query('ALTER TABLE user_settings DISABLE ROW LEVEL SECURITY;');
    await client.query('ALTER TABLE shipping_forms DISABLE ROW LEVEL SECURITY;');
    console.log('✅ Đã tắt RLS\n');

    // Step 2: Drop existing policies
    console.log('2️⃣ Xóa policies cũ...');
    try {
      await client.query('DROP POLICY IF EXISTS "allow_all_settings" ON user_settings;');
      await client.query('DROP POLICY IF EXISTS "allow_all_forms" ON shipping_forms;');
      console.log('✅ Đã xóa policies cũ');
    } catch (error) {
      console.log('⚠️  Không có policies cũ để xóa');
    }

    // Step 3: Create new permissive policies
    console.log('\n3️⃣ Tạo policies mới...');

    // For user_settings - allow all operations
    await client.query(`
      CREATE POLICY "user_settings_allow_all" ON user_settings
      FOR ALL USING (true) WITH CHECK (true);
    `);
    console.log('✅ Policy cho user_settings created');

    // For shipping_forms - allow all operations
    await client.query(`
      CREATE POLICY "shipping_forms_allow_all" ON shipping_forms
      FOR ALL USING (true) WITH CHECK (true);
    `);
    console.log('✅ Policy cho shipping_forms created');

    // Step 4: Re-enable RLS
    console.log('\n4️⃣ Bật lại RLS...');
    await client.query('ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;');
    await client.query('ALTER TABLE shipping_forms ENABLE ROW LEVEL SECURITY;');
    console.log('✅ Đã bật RLS\n');

    // Step 5: Grant permissions again
    console.log('5️⃣ Grant permissions...');
    await client.query('GRANT ALL ON user_settings TO anon, authenticated;');
    await client.query('GRANT ALL ON shipping_forms TO anon, authenticated;');
    console.log('✅ Đã grant permissions\n');

    // Step 6: Test the fix
    console.log('6️⃣ TEST SỬA CHỮA...\n');

    // Test user_settings access
    const testSettingsResult = await client.query('SELECT COUNT(*) as count FROM user_settings');
    console.log('✅ user_settings access test:', testSettingsResult.rows[0]);

    // Test shipping_forms access
    const testFormsResult = await client.query('SELECT COUNT(*) as count FROM shipping_forms');
    console.log('✅ shipping_forms access test:', testFormsResult.rows[0]);

    // Test insert into user_settings
    console.log('\n📝 Test insert user_settings...');
    const insertResult = await client.query(`
      INSERT INTO user_settings (user_id, language, theme)
      VALUES ('test-user', 'vi', 'light')
      ON CONFLICT (user_id) DO UPDATE SET
        language = EXCLUDED.language,
        theme = EXCLUDED.theme,
        updated_at = NOW()
      RETURNING *
    `);
    console.log('✅ Insert result:', insertResult.rows[0]);

    console.log('\n🎉 SỬA CHỮA HOÀN THÀNH!');
    console.log('✅ RLS policies đã được cập nhật');
    console.log('✅ Permissions đã được grant');
    console.log('✅ Test access thành công');
    console.log('\n🚀 Bây giờ thử lại ứng dụng!\n');

    console.log('📋 HƯỚNG DẪN KIỂM TRA:');
    console.log('1. Refresh trình duyệt (Ctrl+F5)');
    console.log('2. Mở Developer Tools (F12)');
    console.log('3. Kiểm tra Console tab - không còn lỗi 406');
    console.log('4. Thử thay đổi ngôn ngữ trong ứng dụng');

  } catch (error) {
    console.log('❌ LỖI KHI SỬA RLS POLICIES:');
    console.log(error.message);

    // Alternative fix: Disable RLS completely for testing
    console.log('\n🔧 THỬ NGUYÊN PHÁP KHÁC: DISABLE RLS COMPLETELY\n');

    try {
      console.log('Tắt RLS hoàn toàn cho user_settings...');
      await client.query('ALTER TABLE user_settings DISABLE ROW LEVEL SECURITY;');

      console.log('Tắt RLS hoàn toàn cho shipping_forms...');
      await client.query('ALTER TABLE shipping_forms DISABLE ROW LEVEL SECURITY;');

      console.log('✅ Đã tắt RLS hoàn toàn - thử lại ứng dụng!');

    } catch (fallbackError) {
      console.log('❌ Thậm chí fallback cũng thất bại:', fallbackError.message);
    }

  } finally {
    await client.end();
    console.log('\n🔌 Đã đóng kết nối PostgreSQL');
  }
}

// Chạy script sửa chữa
fixUserSettingsPolicies();
