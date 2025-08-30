// Test kết nối với thông tin PostgreSQL mới
import { createClient } from '@supabase/supabase-js';

console.log('🔗 TESTING CONNECTION WITH NEW CREDENTIALS...\n');

// Sử dụng thông tin mới từ người dùng
const supabaseUrl = 'https://lnqvjmdffzlxzavfxmek.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucXZqbWRmZnpseHphdmZ4bWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzAwMjMsImV4cCI6MjA3MjE0NjAyM30.QNzr2rrce4CDAIZCuzQ7tIwfRqfnTdmLlrDAtE-oc74';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('📋 Connection Details:');
console.log(`🔗 URL: ${supabaseUrl}`);
console.log(`🔑 Key: ${supabaseKey.substring(0, 20)}...`);
console.log('');

async function testConnection() {
  console.log('1️⃣  Testing Supabase Connection...');

  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('shipping_forms')
      .select('count')
      .limit(1);

    if (error) {
      console.log('❌ Connection failed:', error.message);
      console.log('🔍 Error details:', error);

      // Thông tin bổ sung về lỗi
      if (error.message.includes('relation') || error.message.includes('table')) {
        console.log('\n💡 TABLE NOT FOUND!');
        console.log('Bạn cần tạo tables trước. Hãy chạy SQL sau trong Supabase SQL Editor:');
        console.log('');
        console.log('```sql');
        console.log('CREATE TABLE IF NOT EXISTS shipping_forms (');
        console.log('  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,');
        console.log('  customer_name TEXT NOT NULL,');
        console.log('  customer_address TEXT NOT NULL,');
        console.log('  customer_phone TEXT,');
        console.log('  items JSONB NOT NULL DEFAULT \'[]\'::jsonb,');
        console.log('  total_weight DECIMAL(10,2) NOT NULL DEFAULT 0,');
        console.log('  total_quantity INTEGER NOT NULL DEFAULT 0,');
        console.log('  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),');
        console.log('  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
        console.log(');');
        console.log('');
        console.log('CREATE TABLE IF NOT EXISTS user_settings (');
        console.log('  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,');
        console.log('  user_id TEXT NOT NULL DEFAULT \'anonymous\',');
        console.log('  language TEXT NOT NULL DEFAULT \'vi\',');
        console.log('  theme TEXT NOT NULL DEFAULT \'light\',');
        console.log('  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),');
        console.log('  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
        console.log(');');
        console.log('```');
      }

      return false;
    }

    console.log('✅ Connection successful!');
    console.log('📊 Query executed successfully');
    return true;

  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
    console.log('🔍 Full error:', err);
    return false;
  }
}

async function testTables() {
  console.log('\n2️⃣  Testing Tables...');

  try {
    // Test shipping_forms table
    console.log('📦 Testing shipping_forms table...');
    const { data: formsData, error: formsError } = await supabase
      .from('shipping_forms')
      .select('*')
      .limit(1);

    if (formsError) {
      console.log('❌ shipping_forms table error:', formsError.message);
      return false;
    }

    console.log('✅ shipping_forms table: OK');

    // Test user_settings table
    console.log('⚙️  Testing user_settings table...');
    const { data: settingsData, error: settingsError } = await supabase
      .from('user_settings')
      .select('*')
      .limit(1);

    if (settingsError) {
      console.log('❌ user_settings table error:', settingsError.message);
      return false;
    }

    console.log('✅ user_settings table: OK');
    console.log('📊 Tables are ready for use!');
    return true;

  } catch (err) {
    console.log('❌ Table test failed:', err.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 SUPABASE CONNECTION TEST SUITE');
  console.log('=' .repeat(50));

  const connectionOk = await testConnection();
  let tablesOk = false;

  if (connectionOk) {
    tablesOk = await testTables();
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST RESULTS:');
  console.log('=' .repeat(50));
  console.log(`🔗 Connection: ${connectionOk ? '✅ SUCCESS' : '❌ FAILED'}`);
  console.log(`📦 Tables: ${tablesOk ? '✅ READY' : '❌ NOT READY'}`);

  if (connectionOk && tablesOk) {
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('✅ Supabase is ready for use!');
    console.log('🚀 You can now proceed with application testing.');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Test creating a new shipping form');
    console.log('3. Test viewing forms history');
    console.log('4. Test data persistence');

    return true;
  } else {
    console.log('\n⚠️  ISSUES DETECTED!');
    if (!connectionOk) {
      console.log('❌ Cannot connect to Supabase');
      console.log('💡 Check your internet connection and credentials');
    }
    if (!tablesOk) {
      console.log('❌ Database tables not found');
      console.log('💡 Please create tables using the SQL provided above');
    }

    return false;
  }
}

// Run tests
runTests().catch(console.error);
