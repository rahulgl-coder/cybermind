
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = 'https://rwnosnvboliqjfutrlwc.supabase.co'
const serviceRoleKey =process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, serviceRoleKey)


module.exports = supabase
