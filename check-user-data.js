// Script kiểm tra dữ liệu người dùng đã tạo trong Supabase
import { createClient } from '@supabase/supabase-js';

console.log('🔍 KIỂM TRA DỮ LIỆU NGƯỜI DÙNG TRONG SUPABASE...\n');

const supabaseUrl = 'https://lnqvjmdffzlxzavfxmek.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucXZqbWRmZnpseHphdmZ4bWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzAwMjMsImV4cCI6MjA3MjE0NjAyM30.QNzr2rrce4CDAIZCuzQ7tIwfRqfnTdmLlrDAtE-oc74';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUserData() {
  try {
    console.log('📦 Kiểm tra dữ liệu shipping_forms...');
    const { data: forms, error: formsError } = await supabase
      .from('shipping_forms')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (formsError) {
      console.log('❌ Lỗi khi lấy dữ liệu forms:', formsError.message);
      return;
    }

    console.log(`✅ Tìm thấy ${forms.length} đơn hàng\n`);

    if (forms.length > 0) {
      forms.forEach((form, index) => {
        console.log(`📋 ĐƠN HÀNG ${index + 1}:`);
        console.log(`   🆔 ID: ${form.id}`);
        console.log(`   👤 Khách hàng: ${form.customer_name}`);
        console.log(`   📍 Địa chỉ: ${form.customer_address}`);
        console.log(`   📞 SĐT: ${form.customer_phone || 'Không có'}`);
        console.log(`   📦 Số lượng sản phẩm: ${form.items?.length || 0}`);
        console.log(`   ⚖️  Tổng trọng lượng: ${form.total_weight} kg`);
        console.log(`   📊 Tổng số lượng: ${form.total_quantity}`);
        console.log(`   📅 Ngày tạo: ${new Date(form.created_at).toLocaleString('vi-VN')}`);

        if (form.items && form.items.length > 0) {
          console.log(`   🛍️  Sản phẩm:`);
          form.items.forEach((item, itemIndex) => {
            console.log(`      ${itemIndex + 1}. ${item.name} - SL: ${item.quantity}, TL: ${item.weight}kg`);
          });
        }
        console.log('');
      });
    } else {
      console.log('ℹ️  Chưa có đơn hàng nào được tạo.');
      console.log('💡 Hãy tạo đơn hàng đầu tiên trong ứng dụng!\n');
    }

    // Kiểm tra user_settings
    console.log('⚙️  Kiểm tra cài đặt người dùng...');
    const { data: settings, error: settingsError } = await supabase
      .from('user_settings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (settingsError) {
      console.log('❌ Lỗi khi lấy cài đặt:', settingsError.message);
    } else {
      console.log(`✅ Tìm thấy ${settings.length} cài đặt\n`);

      settings.forEach((setting, index) => {
        console.log(`🔧 CÀI ĐẶT ${index + 1}:`);
        console.log(`   🌐 Ngôn ngữ: ${setting.language === 'vi' ? 'Tiếng Việt' : '中文'}`);
        console.log(`   🎨 Theme: ${setting.theme}`);
        console.log(`   📅 Cập nhật: ${new Date(setting.updated_at).toLocaleString('vi-VN')}\n`);
      });
    }

    // Thống kê
    console.log('📊 THỐNG KÊ TỔNG QUAN:');
    console.log('═'.repeat(40));
    console.log(`📦 Tổng số đơn hàng: ${forms.length}`);
    console.log(`⚙️  Tổng số cài đặt: ${settings?.length || 0}`);

    if (forms.length > 0) {
      const totalWeight = forms.reduce((sum, form) => sum + form.total_weight, 0);
      const totalQuantity = forms.reduce((sum, form) => sum + form.total_quantity, 0);

      console.log(`⚖️  Tổng trọng lượng tất cả đơn: ${totalWeight} kg`);
      console.log(`🔢 Tổng số lượng tất cả sản phẩm: ${totalQuantity}`);
      console.log(`📈 Giá trị trung bình/đơn: ${(totalWeight / forms.length).toFixed(2)} kg`);
    }

    console.log('\n🎉 HOÀN THÀNH KIỂM TRA DỮ LIỆU!');
    console.log('💾 Tất cả dữ liệu được lưu trữ an toàn trong Supabase');

  } catch (error) {
    console.log('❌ LỖI KHI KIỂM TRA DỮ LIỆU:');
    console.log(error.message);
  }
}

// Chạy kiểm tra
checkUserData();
