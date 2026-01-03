<template>
  <q-layout view="lHh Lpr lFf" class="admin-dashboard">
    <q-header elevated class="glass-header">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-uppercase text-weight-bold" style="letter-spacing: 1px;">
          Mr. Photo Admin
        </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm">
           <q-btn flat round icon="notifications_none" />
           <q-btn flat round icon="logout" @click="handleLogout" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer 
      v-model="leftDrawerOpen" 
      show-if-above 
      bordered 
      dark
      class="glass-drawer" 
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md row items-center q-gutter-x-md" style="border-bottom: 1px solid rgba(255,255,255,0.08)">
           <q-avatar size="42px" color="amber-6" text-color="black" font-size="20px" class="text-weight-bold">
              {{ userInitials }}
           </q-avatar>
           <div class="column">
             <div class="text-white text-weight-bold text-subtitle2">{{ userName }}</div>
             <div class="text-grey-6 text-caption" style="max-width: 140px; overflow: hidden; text-overflow: ellipsis;">{{ userEmail }}</div>
           </div>
        </div>

        <q-list padding class="q-mt-sm">
          <!-- Operations Section (Staff & Admin) -->
          <q-item-label header class="text-grey-5 text-weight-bold text-overline">
            OPERATIONS
          </q-item-label>

          <q-item clickable v-ripple to="/admin/system/manage" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/admin/system/orders" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="shopping_bag" />
              <q-badge color="amber-6" text-color="black" floating v-if="userRole === 'admin'">!</q-badge>
            </q-item-section>
            <q-item-section>
              Orders
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/admin/system/products" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="inventory_2" />
            </q-item-section>
            <q-item-section>
              Products
            </q-item-section>
          </q-item>
          
          <q-item clickable v-ripple to="/admin/system/services" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="design_services" />
            </q-item-section>
            <q-item-section>
              Services
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/admin/system/extras" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="card_giftcard" />
            </q-item-section>
            <q-item-section>
              Product Extras
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/admin/system/promo-codes" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="sell" />
            </q-item-section>
            <q-item-section>
              Promo Codes
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/admin/system/messages" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="mail" />
            </q-item-section>
            <q-item-section>
              Messages
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/admin/system/reviews" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="rate_review" />
            </q-item-section>
            <q-item-section>
              Customer Reviews
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/admin/system/gallery" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="photo_library" />
            </q-item-section>
            <q-item-section>
              Happy Moments
            </q-item-section>
          </q-item>

          <!-- User Control Section -->
          <template v-if="userRole === 'admin'">
            <q-separator dark class="q-my-md mx-md" style="opacity: 0.1" />
            <q-item-label header class="text-grey-5 text-weight-bold text-overline">
              USER CONTROL
            </q-item-label>
            
            <q-item 
              clickable 
              v-ripple 
              :to="{ path: '/admin/system/users', query: { role: 'staff' } }" 
              :active="route.path === '/admin/system/users' && route.query.role === 'staff'"
              active-class="active-link"
            >
              <q-item-section avatar>
                <q-icon name="badge" />
              </q-item-section>
              <q-item-section>
                Staff
              </q-item-section>
            </q-item>

            <q-item 
              clickable 
              v-ripple 
              :to="{ path: '/admin/system/users', query: { role: 'customer' } }" 
              :active="route.path === '/admin/system/users' && route.query.role === 'customer'"
              active-class="active-link"
            >
              <q-item-section avatar>
                <q-icon name="people_alt" />
              </q-item-section>
              <q-item-section>
                Customers
              </q-item-section>
            </q-item>
          </template>

          <!-- System Section -->
          <template v-if="userRole === 'admin'">
            <q-separator dark class="q-my-md mx-md" style="opacity: 0.1" />
            <q-item-label header class="text-grey-5 text-weight-bold text-overline">
              SYSTEM
            </q-item-label>

            <q-item clickable v-ripple to="/admin/system/settings" active-class="active-link">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>
                Settings
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const leftDrawerOpen = ref(false)
const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const user = ref(null)
const userRole = ref('')

const userName = computed(() => user.value?.user_metadata?.full_name || 'Admin User')
const userEmail = computed(() => user.value?.email || '')
const userInitials = computed(() => {
  const name = userName.value
  return name ? name.charAt(0).toUpperCase() : 'A'
})

onMounted(async () => {
  console.log('Admin Dashboard Layout Mounted')
  const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !currentUser) {
    console.log('No user found, redirecting to login...')
    router.push('/admin/auth/login')
    return
  }

  // Fetch user profile to verify role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', currentUser.id)
    .maybeSingle()

  if (profileError) {
    console.error('Profile fetch error:', profileError)
    $q.notify({ type: 'negative', message: 'Error verifying access.' })
    router.push('/')
    return
  }

  if (!profile || profile.role === 'customer') {
    console.log('Access denied. Profile:', profile)
    $q.notify({
      type: 'negative',
      message: profile ? 'Access denied.' : 'Profile not found. Please contact support.'
    })
    router.push('/')
  } else {
    console.log('Admin access granted:', profile.role)
    user.value = currentUser
    userRole.value = profile.role
  }
})

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

async function handleLogout() {
  try {
     const { error } = await supabase.auth.signOut()
     if (error) throw error
     router.push('/admin/auth/login')
     $q.notify({
       type: 'positive',
       message: 'Logged out successfully'
     })
  } catch (error) {
     $q.notify({
       type: 'negative',
       message: error.message || 'Error logging out'
     })
  }
}
</script>

<style lang="scss" scoped>
.admin-dashboard {
  background: #0a0a0a;
  color: #ffffff;
}

.glass-header {
  background: rgba(10, 10, 10, 0.8) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff;
}

:deep(.glass-drawer) {
  .q-drawer {
    background: #0f0f0f !important;
  }
  background: #0f0f0f !important;
  
  .q-drawer__content {
    background: #0f0f0f !important;
  }

  border-right: 1px solid rgba(255, 255, 255, 0.08);
  color: #cccccc;
  
  .q-item {
    border-radius: 8px;
    margin: 4px 8px;
    
    &.active-link {
      background: rgba(255, 255, 255, 0.1);
      color: #ffd700; // Gold accent
      .q-icon {
        color: #ffd700;
      }
    }
  }
}
</style>
