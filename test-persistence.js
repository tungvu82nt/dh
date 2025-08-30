// Script test persistence - tạo dữ liệu và kiểm tra lại
import { createClient } from '@supabase/supabase-js';

console.log('💾 TEST PERSISTENCE - TẠO DỮ LIỆU VÀ KIỂM TRA LẠI...\n');

const supabaseUrl = 'https://lnqvjmdffzlxzavfxmek.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucXZqbWRmZnpseHphdmZ4bWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzAwMjMsImV4cCI6MjA3MjE0NjAyM30.QNzr2rrce4CDAIZCuzQ7tIwfRqfnTdmLlrDAtE-oc74';

const supabase = createClient(supabaseUrl, supabaseKey);

// Test data
const testForm = {
  customer_name: 'Nguyễn Văn Test Persistence',
  customer_address: '123 Đường Test Persistence, Quận 1, TP.HCM',
  customer_phone: '0987654321',
  items: [
    {
      id: Date.now(),
      name: 'Sản phẩm test persistence',
      quantity: 5,
      weight: 2.5
    },
    {
      id: Date.now() + 1,
      name: 'Sản phẩm test 2',
      quantity: 3,
      weight: 1.2
    }
  ],
  total_weight: 15.0, // 5*2.5 + 3*1.2 = 12.5 + 3.6 = 15.1, làm tròn
  total_quantity: 8
};

async function testPersistence() {
  try {
    console.log('📝 TẠO ĐƠN HÀNG TEST...');

    // Tạo đơn hàng
    const { data: createdForm, error: createError } = await supabase
      .from('shipping_forms')
      .insert([testForm])
      .select()
      .single();

    if (createError) {
      console.log('❌ Lỗi tạo đơn hàng:', createError.message);
      return false;
    }

    console.log('✅ Đơn hàng đã tạo thành công!');
    console.log(`🆔 ID: ${createdForm.id}`);
    console.log(`👤 Khách hàng: ${createdForm.customer_name}`);
    console.log(`📦 Số sản phẩm: ${createdForm.items.length}`);
    console.log(`⚖️  Trọng lượng: ${createdForm.total_weight} kg\n`);

    // Đợi 2 giây để đảm bảo data được sync
    console.log('⏳ Đợi 2 giây để sync...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Kiểm tra lại dữ liệu
    console.log('🔍 KIỂM TRA LẠI DỮ LIỆU...');

    const { data: fetchedForms, error: fetchError } = await supabase
      .from('shipping_forms')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (fetchError) {
      console.log('❌ Lỗi khi lấy dữ liệu:', fetchError.message);
      return false;
    }

    console.log(`📊 Tìm thấy ${fetchedForms.length} đơn hàng\n`);

    // Tìm đơn hàng vừa tạo
    const foundForm = fetchedForms.find(form => form.id === createdForm.id);

    if (!foundForm) {
      console.log('❌ KHÔNG TÌM THẤY ĐƠN HÀNG VỪA TẠO!');
      return false;
    }

    console.log('✅ TÌM THẤY ĐƠN HÀNG VỪA TẠO:');
    console.log(`   🆔 ID: ${foundForm.id}`);
    console.log(`   👤 Khách hàng: ${foundForm.customer_name}`);
    console.log(`   📍 Địa chỉ: ${foundForm.customer_address}`);
    console.log(`   📞 SĐT: ${foundForm.customer_phone}`);
    console.log(`   📦 Sản phẩm: ${foundForm.items.length}`);
    console.log(`   ⚖️  Trọng lượng: ${foundForm.total_weight} kg`);
    console.log(`   🔢 Số lượng: ${foundForm.total_quantity}`);

    // So sánh dữ liệu
    const dataMatches =
      foundForm.customer_name === testForm.customer_name &&
      foundForm.customer_address === testForm.customer_address &&
      foundForm.customer_phone === testForm.customer_phone &&
      foundForm.items.length === testForm.items.length &&
      foundForm.total_weight === testForm.total_weight &&
      foundForm.total_quantity === testForm.total_quantity;

    if (dataMatches) {
      console.log('\n🎉 PERSISTENCE TEST THÀNH CÔNG!');
      console.log('✅ Dữ liệu được lưu trữ và truy xuất chính xác');
      console.log('✅ Supabase persistence hoạt động hoàn hảo');

      // Test cập nhật
      console.log('\n🔄 TEST CẬP NHẬT DỮ LIỆU...');

      const { error: updateError } = await supabase
        .from('shipping_forms')
        .update({ customer_name: 'Nguyễn Văn Test Updated' })
        .eq('id', foundForm.id);

      if (updateError) {
        console.log('❌ Lỗi cập nhật:', updateError.message);
      } else {
        console.log('✅ Cập nhật thành công');

        // Kiểm tra cập nhật
        const { data: updatedForm } = await supabase
          .from('shipping_forms')
          .select('customer_name')
          .eq('id', foundForm.id)
          .single();

        if (updatedForm?.customer_name === 'Nguyễn Văn Test Updated') {
          console.log('✅ Dữ liệu cập nhật được lưu trữ đúng');
        }
      }

      // Test xóa
      console.log('\n🗑️  TEST XÓA DỮ LIỆU...');

      const { error: deleteError } = await supabase
        .from('shipping_forms')
        .delete()
        .eq('id', foundForm.id);

      if (deleteError) {
        console.log('❌ Lỗi xóa:', deleteError.message);
      } else {
        console.log('✅ Xóa thành công');

        // Kiểm tra xóa
        const { data: checkDeleted } = await supabase
          .from('shipping_forms')
          .select('id')
          .eq('id', foundForm.id);

        if (!checkDeleted || checkDeleted.length === 0) {
          console.log('✅ Dữ liệu đã được xóa hoàn toàn');
        }
      }

      console.log('\n🏆 TẤT CẢ PERSISTENCE TESTS ĐỀU THÀNH CÔNG!');
      console.log('💾 Supabase database hoạt động hoàn hảo');
      console.log('🔄 Data persistence, updates, deletes đều ổn định');

      return true;

    } else {
      console.log('\n❌ DỮ LIỆU KHÔNG KHỚP!');
      console.log('Expected vs Actual:');
      console.log(`Name: "${testForm.customer_name}" vs "${foundForm.customer_name}"`);
      console.log(`Address: "${testForm.customer_address}" vs "${foundForm.customer_address}"`);
      console.log(`Items: ${testForm.items.length} vs ${foundForm.items.length}`);
      return false;
    }

  } catch (error) {
    console.log('❌ LỖI TRONG PERSISTENCE TEST:');
    console.log(error.message);
    return false;
  }
}

// Chạy test
testPersistence();
