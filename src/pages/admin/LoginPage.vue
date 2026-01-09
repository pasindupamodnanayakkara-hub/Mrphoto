<template>
  <q-page class="flex flex-center">
    <q-card class="glass-card q-pa-lg" style="width: 100%; max-width: 400px;">
      <q-card-section class="text-center">
        <div class="text-h4 text-weight-bold text-white q-mb-xs">Welcome Back</div>
        <div class="text-grey-5 text-subtitle2">Sign in to Admin Dashboard</div>
      </q-card-section>
      
      <q-card-section class="q-mt-sm">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input 
            v-model="email" 
            label="Email Address" 
            dark 
            color="amber-6" 
            outlined 
            class="input-glass"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="grey-6" />
            </template>
          </q-input>
          
          <q-input 
            v-model="password" 
            label="Password" 
            type="password" 
            dark 
            color="amber-6" 
            outlined 
            class="input-glass"
          >
             <template v-slot:prepend>
              <q-icon name="lock" color="grey-6" />
            </template>
          </q-input>
          
          <div class="row items-center justify-between text-caption">
             <q-checkbox v-model="rememberMe" label="Remember me" dark color="amber-6" size="sm" class="text-white" />
             <a href="#" class="text-grey-3 hover-text-amber" style="text-decoration: none;">Forgot Password?</a>
          </div>

          <q-btn 
            label="Sign In" 
            type="submit" 
            color="amber-8" 
            class="full-width q-py-sm text-weight-bold text-black shadow-10" 
            size="lg" 
            rounded 
            unelevated
            :loading="loading"
          />
        </q-form>
      </q-card-section>
      
      <q-card-section class="text-center q-pt-md">
        <div class="text-grey-6 text-subtitle1">
          Don't have an account? 
          <router-link to="/admin/auth/register" class="text-amber-5 text-weight-bold hover-underline" style="text-decoration: none;">Register</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const router = useRouter()
const loading = ref(false)

async function onSubmit() {
  if (loading.value) return
  loading.value = true
  console.log('Login started for:', email.value)
  
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (authError) {
      console.error('Auth error:', authError)
      throw authError
    }

    console.log('Auth successful, fetching profile for:', authData.user.id)

    // Fetch user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .maybeSingle() // Use maybeSingle to avoid error if not found

    if (profileError) {
      console.error('Profile fetch error:', profileError)
      // We still proceed as customer if profile fetch fails
    }

    $q.notify({
      type: 'positive',
      message: 'Login successful!'
    })
    
    const role = profile?.role || 'customer'
    console.log('User role identified as:', role)
    
    // Redirect based on role
    if (role === 'customer') {
      console.log('Redirecting to home...')
      await router.push('/')
    } else {
      console.log('Redirecting to dashboard...')
      await router.push('/admin/system/manage')
    }

  } catch (error) {
    console.error('Detailed login error:', error)
    
    // Check for invalid credentials (which could mean not registered)
    if (error.message && error.message.includes('Invalid login credentials')) {
      $q.notify({
        type: 'negative',
        message: 'Invalid email or password. Please check your credentials.',
        timeout: 2000
      })
      // No redirect - let user try again
    } else {
      $q.notify({
        type: 'negative',
        message: error.message || 'Failed to sign in. Please check your credentials.'
      })
    }
  } finally {
    loading.value = false
    console.log('Login process finished.')
  }
}
</script>

<style lang="scss" scoped>
.glass-card {
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.input-glass :deep(.q-field__control) {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
}
</style>
