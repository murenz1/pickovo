import 'package:supabase_flutter/supabase_flutter.dart';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

void initializeSupabase() {
  Supabase.initialize(
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
  );
}
