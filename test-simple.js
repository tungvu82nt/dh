// Test đơn giản để kiểm tra Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnqvjmdffzlxzavfxmek.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucXZqbWRmZnpseHphdmZ4bWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzAwMjMsImV4cCI6MjA3MjE0NjAyM30.QNzr2rrce4CDAIZCuzQ7tIwfRqfnTdmLlrDAtE-oc74';

const supabase = createClient(supabaseUrl, supabaseKey);

async function quickTest() {
  console.log('🧪 QUICK SUPABASE TEST\n');

  try {
    // Test basic connection
    console.log('1️⃣ Testing basic connection...');
    const { data, error } = await supabase.from('shipping_forms').select('*').limit(1);

    if (error) {
      console.log('❌ Error:', error.message);
      console.log('💡 This usually means tables don\'t exist yet.');
      console.log('📋 Please create tables first using: supabase-schema-simple.sql');
      return false;
    }

    console.log('✅ Connection successful!');
    console.log('📊 Records found:', data?.length || 0);

    return true;

  } catch (err) {
    console.log('❌ Test failed:', err.message);
    return false;
  }
}

quickTest();
