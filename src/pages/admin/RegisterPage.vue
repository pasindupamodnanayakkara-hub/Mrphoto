<template>
  <q-page class="flex flex-center">
    <q-card class="glass-card q-pa-lg" style="width: 100%; max-width: 450px;">
      <q-card-section class="text-center">
        <div class="text-h4 text-weight-bold text-white q-mb-xs">Create Account</div>
        <div class="text-grey-5 text-subtitle2">Join the management team</div>
      </q-card-section>
      
      <q-card-section class="q-mt-sm">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input 
            v-model="name" 
            label="Full Name" 
            dark 
            color="amber-6" 
            outlined 
            class="input-glass"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="grey-6" />
            </template>
          </q-input>

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
               :type="isPwdVisible ? 'text' : 'password'" 
               dark 
               color="amber-6" 
               outlined 
               class="input-glass"
             >
               <template v-slot:prepend>
                 <q-icon name="lock" color="grey-6" />
               </template>
               <template v-slot:append>
                 <q-icon 
                   :name="isPwdVisible ? 'visibility' : 'visibility_off'" 
                   class="cursor-pointer" 
                   color="grey-6" 
                   @click="isPwdVisible = !isPwdVisible" 
                 />
               </template>
             </q-input>

             <q-input 
               v-model="confirmPassword" 
               label="Confirm Password" 
               :type="isConfirmPwdVisible ? 'text' : 'password'" 
               dark 
               color="amber-6" 
               outlined 
               class="input-glass"
             >
                <template v-slot:prepend>
                 <q-icon name="lock_outline" color="grey-6" />
               </template>
               <template v-slot:append>
                 <q-icon 
                   :name="isConfirmPwdVisible ? 'visibility' : 'visibility_off'" 
                   class="cursor-pointer" 
                   color="grey-6" 
                   @click="isConfirmPwdVisible = !isConfirmPwdVisible" 
                 />
               </template>
             </q-input>

           <div class="row justify-end q-px-sm q-mb-sm">
             <q-btn 
               flat 
               dense 
               no-caps 
               color="amber-5" 
               icon="vpn_key" 
               label="Suggest Strong Password" 
               size="sm" 
               @click="generateStrongPassword" 
             />
           </div>

          <!-- Password Rules Feedback -->
          <div class="q-px-sm">
            <div class="text-caption q-mb-xs text-grey-5">Password Requirements:</div>
            <div class="row q-gutter-x-md q-gutter-y-xs">
              <div :class="hasLength ? 'text-green-5' : 'text-grey-6'" class="row items-center transition-color">
                <q-icon :name="hasLength ? 'check_circle' : 'radio_button_unchecked'" size="14px" class="q-mr-xs" />
                <span style="font-size: 11px;">8+ Characters</span>
              </div>
              <div :class="hasUpperCase ? 'text-green-5' : 'text-grey-6'" class="row items-center transition-color">
                <q-icon :name="hasUpperCase ? 'check_circle' : 'radio_button_unchecked'" size="14px" class="q-mr-xs" />
                <span style="font-size: 11px;">1 Capital Letter</span>
              </div>
              <div :class="hasSymbol ? 'text-green-5' : 'text-grey-6'" class="row items-center transition-color">
                <q-icon :name="hasSymbol ? 'check_circle' : 'radio_button_unchecked'" size="14px" class="q-mr-xs" />
                <span style="font-size: 11px;">1 Symbol</span>
              </div>
            </div>
          </div>
          
          <div class="q-mt-lg">
             <q-btn 
              label="Register" 
              type="submit" 
              color="amber-8" 
              class="full-width q-py-sm text-weight-bold text-black shadow-10" 
              size="lg" 
              rounded 
              unelevated
            />
          </div>
        </q-form>
      </q-card-section>
      
      <q-card-section class="text-center q-pt-md">
        <div class="text-grey-6 text-subtitle1">
          Already have an account? 
          <router-link to="/admin/auth/login" class="text-amber-5 text-weight-bold hover-underline" style="text-decoration: none;">Sign In</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()
const loading = ref(false)

const isPwdVisible = ref(false)
const isConfirmPwdVisible = ref(false)

// Password Validation Rules
const hasUpperCase = computed(() => /[A-Z]/.test(password.value))
const hasSymbol = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(password.value))
const hasLength = computed(() => password.value.length >= 8)

const isPasswordValid = computed(() => 
  hasUpperCase.value && hasSymbol.value && hasLength.value
)

function generateStrongPassword() {
  const chars = "abcdefghijklmnopqrstuvwxyz"
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const symbols = "@#$%"
  const numbers = "0123456789"
  
  let result = ""
  
  // Ensure rules are met
  result += upperChars.charAt(Math.floor(Math.random() * upperChars.length))
  result += symbols.charAt(Math.floor(Math.random() * symbols.length))
  result += numbers.charAt(Math.floor(Math.random() * numbers.length))
  
  // Fill the rest
  const allChars = chars + upperChars + symbols + numbers
  for (let i = 0; i < 7; i++) {
    result += allChars.charAt(Math.floor(Math.random() * allChars.length))
  }
  
  // Shuffle result
  password.value = result.split('').sort(() => 0.5 - Math.random()).join('')
  confirmPassword.value = password.value
  
  $q.notify({
    type: 'positive',
    message: 'Strong password generated!',
    timeout: 1000
  })
}

async function onSubmit() {
  if (loading.value) return
  
  if (!isPasswordValid.value) {
    $q.notify({
      type: 'negative',
      message: 'Please meet all password requirements.'
    })
    return
  }
  
  if (password.value !== confirmPassword.value) {
    $q.notify({
      type: 'negative',
      message: 'Passwords do not match.'
    })
    return
  }

  loading.value = true
  console.log('Signup started for:', email.value)

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: name.value
        }
      }
    })

    if (error) {
      console.error('Signup error:', error)
      throw error
    }

    console.log('Signup pre-success:', data)

    // Show a premium success dialog
    $q.dialog({
      title: '<div class="text-amber-6 text-weight-bold">Registration Successful!</div>',
      message: `
        <div class="text-white">
          <p>Welcome to Mr. Photo, <b>${name.value}</b>!</p>
          <p>Your account has been created successfully. You can now log in to your account immediately.</p>
        </div>
      `,
      html: true,
      dark: true,
      ok: {
        color: 'amber-6',
        label: 'Go to Login',
        unelevated: true,
        class: 'text-black text-weight-bold'
      },
      persistent: true,
      class: 'glass-card'
    }).onOk(() => {
      router.push('/admin/auth/login')
    })

  } catch (error) {
    console.error('Detailed signup error:', error)
    $q.notify({
      type: 'negative',
      message: error.message || 'Failed to sign up.'
    })
  } finally {
    loading.value = false
    console.log('Signup process finished.')
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
