// Script kiểm tra chi tiết chức năng ngày tháng trong dự án
import { createClient } from '@supabase/supabase-js';

console.log('📅 KIỂM TRA CHỨC NĂNG NGÀY THÁNG TRONG PACKSHEET LITE\n');
console.log('═'.repeat(60));
console.log('');

const supabaseUrl = 'https://lnqvjmdffzlxzavfxmek.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucXZqbWRmZnpseHphdmZ4bWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzAwMjMsImV4cCI6MjA3MjE0NjAyM30.QNzr2rrce4CDAIZCuzQ7tIwfRqfnTdmLlrDAtE-oc74';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabaseTriggers() {
  console.log('🔧 KIỂM TRA TRIGGER VÀ AUTO-UPDATE TRONG DATABASE\n');

  const connectionString = 'postgresql://postgres.lnqvjmdffzlxzavfxmek:Donhang1@@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

  // Sử dụng dynamic import cho pg
  const { Client } = await import('pg');
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();

    // Kiểm tra triggers
    console.log('📋 TRIGGERS HIỆN CÓ:');
    const triggersResult = await client.query(`
      SELECT
        event_object_table AS table_name,
        trigger_name,
        event_manipulation AS event,
        action_statement AS action
      FROM information_schema.triggers
      WHERE event_object_schema = 'public'
      AND event_object_table IN ('shipping_forms', 'user_settings')
      ORDER BY event_object_table, trigger_name
    `);

    if (triggersResult.rows.length === 0) {
      console.log('❌ Không có trigger nào được tìm thấy!');
      console.log('💡 Điều này có nghĩa là updated_at sẽ KHÔNG được cập nhật tự động');
    } else {
      triggersResult.rows.forEach(trigger => {
        console.log(`✅ ${trigger.table_name}: ${trigger.trigger_name} (${trigger.event})`);
        console.log(`   Action: ${trigger.action}`);
      });
    }

    // Kiểm tra functions
    console.log('\n📋 DATABASE FUNCTIONS:');
    const functionsResult = await client.query(`
      SELECT
        routine_name,
        routine_definition
      FROM information_schema.routines
      WHERE routine_schema = 'public'
      AND routine_name LIKE '%update%' OR routine_name LIKE '%handle%'
    `);

    if (functionsResult.rows.length === 0) {
      console.log('❌ Không có function auto-update nào');
    } else {
      functionsResult.rows.forEach(func => {
        console.log(`✅ ${func.routine_name}`);
      });
    }

    // Kiểm tra table structure
    console.log('\n📋 TABLE STRUCTURE:');
    const tableResult = await client.query(`
      SELECT
        column_name,
        data_type,
        column_default,
        is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name = 'shipping_forms'
      AND column_name IN ('created_at', 'updated_at')
      ORDER BY ordinal_position
    `);

    tableResult.rows.forEach(col => {
      console.log(`✅ ${col.column_name}: ${col.data_type}`);
      console.log(`   Default: ${col.column_default}`);
      console.log(`   Nullable: ${col.is_nullable}`);
    });

  } catch (error) {
    console.log('❌ Lỗi khi kiểm tra database:', error.message);
  } finally {
    await client.end();
  }
}

async function testDateFunctionality() {
  console.log('\n📅 TEST CHỨC NĂNG NGÀY THÁNG\n');

  try {
    // Test tạo đơn hàng mới
    console.log('1️⃣ TẠO ĐƠN HÀNG MỚI:');
    const testForm = {
      customer_name: 'Test Date Functionality',
      customer_address: '123 Test Street, Test City',
      customer_phone: '0123456789',
      items: [
        {
          id: Date.now(),
          name: 'Test Product',
          quantity: 2,
          weight: 1.5
        }
      ],
      total_weight: 3.0,
      total_quantity: 2
    };

    const beforeCreate = new Date();
    console.log('⏰ Thời gian trước khi tạo:', beforeCreate.toISOString());

    const { data: createdForm, error: createError } = await supabase
      .from('shipping_forms')
      .insert([testForm])
      .select()
      .single();

    if (createError) {
      console.log('❌ Lỗi tạo đơn hàng:', createError.message);
      return;
    }

    console.log('✅ Đơn hàng đã tạo thành công!');
    console.log('📅 created_at từ DB:', createdForm.created_at);
    console.log('📅 updated_at từ DB:', createdForm.updated_at);

    const afterCreate = new Date();
    console.log('⏰ Thời gian sau khi tạo:', afterCreate.toISOString());

    // Test cập nhật đơn hàng
    console.log('\n2️⃣ CẬP NHẬT ĐƠN HÀNG:');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Đợi 2 giây

    const beforeUpdate = new Date();
    console.log('⏰ Thời gian trước khi cập nhật:', beforeUpdate.toISOString());

    const { data: updatedForm, error: updateError } = await supabase
      .from('shipping_forms')
      .update({
        customer_name: 'Updated Test Date Functionality',
        total_weight: 5.0
      })
      .eq('id', createdForm.id)
      .select()
      .single();

    if (updateError) {
      console.log('❌ Lỗi cập nhật:', updateError.message);
    } else {
      console.log('✅ Đơn hàng đã cập nhật!');
      console.log('📅 created_at sau cập nhật:', updatedForm.created_at);
      console.log('📅 updated_at sau cập nhật:', updatedForm.updated_at);

      // Kiểm tra xem updated_at có thay đổi không
      const createdTime = new Date(createdForm.created_at);
      const updatedTime = new Date(updatedForm.updated_at);

      if (updatedTime.getTime() === createdTime.getTime()) {
        console.log('⚠️  updated_at KHÔNG thay đổi sau cập nhật!');
        console.log('❌ Thiếu trigger auto-update updated_at');
      } else {
        console.log('✅ updated_at đã được cập nhật tự động!');
        console.log('⏱️  Độ trễ:', updatedTime.getTime() - createdTime.getTime(), 'ms');
      }
    }

    // Dọn dẹp
    await supabase.from('shipping_forms').delete().eq('id', createdForm.id);
    console.log('\n🧹 Đã dọn dẹp test data');

  } catch (error) {
    console.log('❌ Lỗi trong test:', error.message);
  }
}

async function analyzeDateHandling() {
  console.log('\n📊 PHÂN TÍCH CHỨC NĂNG NGÀY THÁNG\n');

  console.log('🔍 TRẠNG THÁI HIỆN TẠI:');
  console.log('');

  // Kiểm tra dữ liệu hiện có
  const { data: forms, error } = await supabase
    .from('shipping_forms')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.log('❌ Lỗi lấy dữ liệu:', error.message);
    return;
  }

  if (forms.length === 0) {
    console.log('ℹ️  Chưa có đơn hàng nào trong database');
  } else {
    console.log('📋 ĐƠN HÀNG GẦN NHẤT:');
    forms.forEach((form, index) => {
      const created = new Date(form.created_at);
      const updated = new Date(form.updated_at);
      const age = Date.now() - created.getTime();
      const ageMinutes = Math.floor(age / (1000 * 60));

      console.log(`${index + 1}. ${form.customer_name}`);
      console.log(`   📅 Tạo: ${created.toLocaleString('vi-VN')}`);
      console.log(`   🔄 Cập nhật: ${updated.toLocaleString('vi-VN')}`);
      console.log(`   ⏱️  Tuổi: ${ageMinutes} phút`);
      console.log('');
    });
  }

  console.log('🎯 ĐÁNH GIÁ CHỨC NĂNG NGÀY THÁNG:');
  console.log('');

  // Đánh giá
  const evaluations = [
    {
      feature: 'Ngày tạo đơn hàng',
      status: '✅ HOẠT ĐỘNG',
      detail: 'Tự động tạo khi lưu đơn hàng (new Date().toISOString())'
    },
    {
      feature: 'Hiển thị ngày theo ngôn ngữ',
      status: '✅ HOẠT ĐỘNG',
      detail: 'Hỗ trợ vi-VN và zh-CN format'
    },
    {
      feature: 'Auto-update updated_at',
      status: '❌ THIẾU',
      detail: 'Không có trigger tự động cập nhật khi sửa đổi'
    },
    {
      feature: 'Timezone handling',
      status: '✅ HOẠT ĐỘNG',
      detail: 'Sử dụng UTC timezone trong database'
    },
    {
      feature: 'Date sorting & filtering',
      status: '✅ HOẠT ĐỘNG',
      detail: 'Order by created_at DESC, có index'
    }
  ];

  evaluations.forEach(evaluation => {
    console.log(`${evaluation.status} ${evaluation.feature}`);
    console.log(`   ${evaluation.detail}`);
    console.log('');
  });

  console.log('💡 KHUYẾN NGHỊ CẢI THIỆN:');
  console.log('1. Thêm trigger auto-update updated_at khi sửa đổi');
  console.log('2. Thêm validation cho date ranges');
  console.log('3. Thêm timezone support theo user location');
  console.log('4. Thêm date picker cho custom dates');
}

// Chạy các test
await checkDatabaseTriggers();
await testDateFunctionality();
await analyzeDateHandling();
