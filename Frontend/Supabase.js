// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_

export const supabase = createClient(supabaseUrl, supabaseKey)
