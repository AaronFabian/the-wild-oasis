import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qajkxqcizepqbkmmwoem.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhamt4cWNpemVwcWJrbW13b2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5ODg1MzYsImV4cCI6MjAwNzU2NDUzNn0.ujRbLK0-VuZZibFNoWhAXoyHoZTpnjjUL1ALfOhi3Go"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;