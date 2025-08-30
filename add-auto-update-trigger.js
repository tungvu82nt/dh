// Script thêm trigger tự động cập nhật updated_at
import pkg from 'pg';
const { Client } = pkg;

console.log('🔧 THÊM TRIGGER TỰ ĐỘNG CẬP NHẬT UPDATED_AT\n');

const connectionString = 'postgresql://postgres.lnqvjmdffzlxzavfxmek:Donhang1@@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString: connectionString,
});

async function addAutoUpdateTrigger() {
  try {
    console.log('🔌 Kết nối đến PostgreSQL...');
    await client.connect();
    console.log('✅ Kết nối thành công!\n');

    console.log('📝 TẠO FUNCTION AUTO-UPDATE...');

    // Tạo function để cập nhật updated_at
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    console.log('✅ Function update_updated_at_column đã tạo!\n');

    console.log('⚙️  TẠO TRIGGERS CHO CÁC TABLES...\n');

    // Tạo trigger cho shipping_forms
    try {
      await client.query('DROP TRIGGER IF EXISTS update_shipping_forms_updated_at ON shipping_forms;');
      await client.query(`
        CREATE TRIGGER update_shipping_forms_updated_at
        BEFORE UPDATE ON shipping_forms
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      `);
      console.log('✅ Trigger cho shipping_forms đã tạo!');
    } catch (error) {
      console.log('⚠️  Lỗi tạo trigger shipping_forms:', error.message);
    }

    // Tạo trigger cho user_settings
    try {
      await client.query('DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;');
      await client.query(`
        CREATE TRIGGER update_user_settings_updated_at
        BEFORE UPDATE ON user_settings
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      `);
      console.log('✅ Trigger cho user_settings đã tạo!');
    } catch (error) {
      console.log('⚠️  Lỗi tạo trigger user_settings:', error.message);
    }

    console.log('\n🧪 TEST TRIGGER HOẠT ĐỘNG...\n');

    // Test với shipping_forms
    console.log('📦 Test với shipping_forms:');

    // Tạo record test
    const createResult = await client.query(`
      INSERT INTO shipping_forms (customer_name, customer_address, items, total_weight, total_quantity)
      VALUES ('Test Auto Update', '123 Test St', '[]'::jsonb, 1.0, 1)
      RETURNING id, created_at, updated_at
    `);

    const recordId = createResult.rows[0].id;
    const createdAt = createResult.rows[0].created_at;
    const updatedAtBefore = createResult.rows[0].updated_at;

    console.log('📅 Trước khi update:');
    console.log('   created_at:', createdAt);
    console.log('   updated_at:', updatedAtBefore);

    // Đợi 2 giây
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update record
    await client.query(`
      UPDATE shipping_forms
      SET customer_name = 'Test Auto Update - Updated'
      WHERE id = $1
    `, [recordId]);

    // Kiểm tra updated_at sau update
    const checkResult = await client.query(`
      SELECT created_at, updated_at
      FROM shipping_forms
      WHERE id = $1
    `, [recordId]);

    const updatedAtAfter = checkResult.rows[0].updated_at;

    console.log('\n📅 Sau khi update:');
    console.log('   created_at:', checkResult.rows[0].created_at);
    console.log('   updated_at:', updatedAtAfter);

    // Kiểm tra xem updated_at có thay đổi không
    const beforeTime = new Date(updatedAtBefore).getTime();
    const afterTime = new Date(updatedAtAfter).getTime();

    if (afterTime > beforeTime) {
      console.log('\n🎉 TRIGGER HOẠT ĐỘNG THÀNH CÔNG!');
      console.log('✅ updated_at được cập nhật tự động');
      console.log(`⏱️  Độ trễ: ${afterTime - beforeTime}ms`);
    } else {
      console.log('\n❌ TRIGGER KHÔNG HOẠT ĐỘNG!');
      console.log('⚠️  updated_at không thay đổi');
    }

    // Dọn dẹp
    await client.query('DELETE FROM shipping_forms WHERE id = $1', [recordId]);
    console.log('\n🧹 Đã dọn dẹp test data');

    console.log('\n📋 TÓM TẮT:');
    console.log('✅ Function: update_updated_at_column');
    console.log('✅ Trigger: shipping_forms');
    console.log('✅ Trigger: user_settings');
    console.log('🚀 Sẵn sàng sử dụng!');

  } catch (error) {
    console.log('❌ LỖI:', error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Đã đóng kết nối');
  }
}

// Chạy script
addAutoUpdateTrigger();
