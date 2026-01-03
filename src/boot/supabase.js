import { createClient } from '@supabase/supabase-js'
import { boot } from 'quasar/wrappers'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: sessionStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$supabase
  app.config.globalProperties.$supabase = supabase
  // for use inside Vue files (Composition API)
  app.provide('supabase', supabase)
})

export { supabase }
