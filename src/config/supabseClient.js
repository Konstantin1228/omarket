import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uwebfsdpwxsplhtglynf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3ZWJmc2Rwd3hzcGxodGdseW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk1MDI2MjYsImV4cCI6MTk4NTA3ODYyNn0.BbV_i2HaWfrjMqpaMXOA_hVAmV5rmW_ZGGUFa3xnMlA"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase