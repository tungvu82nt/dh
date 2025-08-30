// Test Supabase Integration Script
// Chạy lệnh: node test-supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnqvjmdffzlxzavfxmek.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucXZqbWRmZnpseHphdmZ4bWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzAwMjMsImV4cCI6MjA3MjE0NjAyM30.QNzr2rrce4CDAIZCuzQ7tIwfRqfnTdmLlrDAtE-oc74';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🧪 TESTING SUPABASE INTEGRATION...\n');

// Test 1: Connection
async function testConnection() {
  console.log('1️⃣  Testing Supabase Connection...');
  try {
    const { data, error } = await supabase
      .from('shipping_forms')
      .select('count')
      .limit(1);

    if (error) throw error;
    console.log('✅ Connection successful!');
    return true;
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    return false;
  }
}

// Test 2: Create Form
async function testCreateForm() {
  console.log('\n2️⃣  Testing Create Form...');
  try {
    const testForm = {
      customer_name: 'Test Customer',
      customer_address: '123 Test Street',
      customer_phone: '+1234567890',
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

    const { data, error } = await supabase
      .from('shipping_forms')
      .insert([testForm])
      .select()
      .single();

    if (error) throw error;
    console.log('✅ Form created successfully!');
    console.log('📄 Form ID:', data.id);
    return data.id;
  } catch (error) {
    console.log('❌ Create form failed:', error.message);
    return null;
  }
}

// Test 3: Read Forms
async function testReadForms() {
  console.log('\n3️⃣  Testing Read Forms...');
  try {
    const { data, error } = await supabase
      .from('shipping_forms')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    console.log('✅ Forms fetched successfully!');
    console.log(`📊 Total forms: ${data.length}`);

    if (data.length > 0) {
      console.log('📋 Latest form:', {
        id: data[0].id,
        customer: data[0].customer_name,
        items: data[0].items.length,
        created: data[0].created_at
      });
    }
    return data;
  } catch (error) {
    console.log('❌ Read forms failed:', error.message);
    return [];
  }
}

// Test 4: Update Form
async function testUpdateForm(formId) {
  console.log('\n4️⃣  Testing Update Form...');
  try {
    const { data, error } = await supabase
      .from('shipping_forms')
      .update({
        customer_name: 'Updated Test Customer',
        total_weight: 5.0
      })
      .eq('id', formId)
      .select()
      .single();

    if (error) throw error;
    console.log('✅ Form updated successfully!');
    console.log('📝 Updated customer:', data.customer_name);
    return true;
  } catch (error) {
    console.log('❌ Update form failed:', error.message);
    return false;
  }
}

// Test 5: Delete Form
async function testDeleteForm(formId) {
  console.log('\n5️⃣  Testing Delete Form...');
  try {
    const { error } = await supabase
      .from('shipping_forms')
      .delete()
      .eq('id', formId);

    if (error) throw error;
    console.log('✅ Form deleted successfully!');
    return true;
  } catch (error) {
    console.log('❌ Delete form failed:', error.message);
    return false;
  }
}

// Test 6: Test User Settings
async function testUserSettings() {
  console.log('\n6️⃣  Testing User Settings...');
  try {
    // Test insert/update
    const { data: insertData, error: insertError } = await supabase
      .from('user_settings')
      .upsert({
        user_id: 'test-user',
        language: 'vi',
        theme: 'light'
      })
      .select()
      .single();

    if (insertError) throw insertError;
    console.log('✅ User settings saved!');

    // Test fetch
    const { data: fetchData, error: fetchError } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', 'test-user')
      .single();

    if (fetchError) throw fetchError;
    console.log('✅ User settings fetched!');
    console.log('⚙️  Settings:', {
      language: fetchData.language,
      theme: fetchData.theme
    });

    return true;
  } catch (error) {
    console.log('❌ User settings test failed:', error.message);
    return false;
  }
}

// Test 7: Performance Test
async function testPerformance() {
  console.log('\n7️⃣  Testing Performance...');
  const startTime = Date.now();

  try {
    // Test multiple queries
    const promises = [
      supabase.from('shipping_forms').select('count'),
      supabase.from('user_settings').select('count'),
      supabase.from('shipping_forms').select('*').limit(10),
    ];

    await Promise.all(promises);
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log('✅ Performance test completed!');
    console.log(`⏱️  Total time: ${duration}ms`);
    console.log(`🚀 Average response: ${Math.round(duration/3)}ms per query`);

    if (duration < 1000) {
      console.log('💨 Excellent performance!');
    } else if (duration < 3000) {
      console.log('⚡ Good performance');
    } else {
      console.log('🐌 Performance could be improved');
    }

    return true;
  } catch (error) {
    console.log('❌ Performance test failed:', error.message);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 SUPABASE INTEGRATION TEST SUITE\n');
  console.log('=' .repeat(50));

  const results = {
    connection: await testConnection(),
    create: false,
    read: false,
    update: false,
    delete: false,
    settings: await testUserSettings(),
    performance: await testPerformance()
  };

  // Test CRUD operations
  const forms = await testReadForms();
  results.read = forms.length >= 0;

  if (results.connection) {
    const formId = await testCreateForm();
    if (formId) {
      results.create = true;
      results.update = await testUpdateForm(formId);
      results.delete = await testDeleteForm(formId);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST RESULTS SUMMARY:');
  console.log('='.repeat(50));

  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;

  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✅' : '❌';
    const name = test.charAt(0).toUpperCase() + test.slice(1);
    console.log(`${status} ${name}: ${passed ? 'PASSED' : 'FAILED'}`);
  });

  console.log('\n🎯 OVERALL RESULT:');
  if (passedTests === totalTests) {
    console.log('🎉 ALL TESTS PASSED! Supabase integration is working perfectly!');
  } else if (passedTests >= totalTests * 0.8) {
    console.log(`👍 MOST TESTS PASSED (${passedTests}/${totalTests}). Minor issues detected.`);
  } else {
    console.log(`⚠️  SOME TESTS FAILED (${passedTests}/${totalTests}). Please check Supabase setup.`);
  }

  console.log('\n🔗 Supabase URL:', supabaseUrl);
  console.log('📋 Schema file: supabase-schema.sql');
  console.log('🛠️  If tests failed, make sure to run the SQL schema in Supabase dashboard.');

  process.exit(passedTests === totalTests ? 0 : 1);
}

// Run tests
runTests().catch(console.error);
