<template>
  <q-layout view="lHh Lpr lFf">
    
    <!-- Content Fade Overlay -->
    <div class="fixed-top full-width top-fade-overlay" :style="{ opacity: isScrolled ? 1 : 0, transition: 'opacity 0.8s ease' }"></div>

    <!-- Modern Floating Centered Glass Header -->
    <div class="fixed-top z-max full-width pointer-events-none q-pt-md row justify-center transition-all" :class="{'q-pt-sm': isScrolled}">
      <div 
        class="glass-bar glass-bar-dark row items-center justify-between transition-all pointer-events-auto rounded-borders shadow-20"
        :class="[
          isScrolled ? 'q-px-lg q-py-sm compact-mode glass-bar-scrolled' : 'q-px-xl q-py-md'
        ]"
        :style="headerStyle"
      >
        <div class="row items-center" v-if="!isScrolled">
          <!-- Logo Area -->
          <q-avatar size="42px" class="transition-all cursor-pointer q-mr-md">
            <img src="~assets/logo.png" />
          </q-avatar>
          
          <div 
            class="text-h6 text-weight-bold letter-spacing-md text-uppercase gt-sm cursor-pointer title-glow transition-all overflow-hidden"
            style="white-space: nowrap;"
          >
            Mr. Photo
          </div>
        </div>

        <!-- Desktop Nav -->
        <div class="gt-xs row items-center transition-all" :class="isScrolled ? 'q-gutter-x-sm' : 'q-gutter-x-md'">
          <q-btn flat dense round icon="home" :size="isScrolled ? 'md' : 'lg'" class="nav-icon-btn" :class="{'q-mr-xs': isScrolled, 'q-mr-sm': !isScrolled}" to="/" />
          
          <div class="vertical-separator bg-grey-8 transition-all" :style="{height: isScrolled ? '20px' : '30px', opacity: isScrolled ? '0.5' : '1'}"></div>
          
          <q-btn 
            v-for="(btn, idx) in navButtons" 
            :key="idx"
            flat 
            :round="isScrolled"
            :dense="isScrolled"
            :no-caps="!isScrolled" 
            :icon="btn.icon" 
            :label="isScrolled ? '' : btn.label" 
            class="nav-link-btn transition-all" 
            :class="{'icon-only-btn': isScrolled}"
            @click="btn.action ? btn.action() : null" 
            :to="btn.to"
          />

          <!-- Cart Icon (Only Visible when Logged In) -->
          <q-btn 
            v-if="user"
            flat 
            :round="isScrolled"
            :dense="isScrolled" 
            icon="shopping_cart" 
            :label="isScrolled ? '' : 'Cart'"
            class="nav-link-btn q-mr-sm transition-all"
            :class="{'icon-only-btn': isScrolled}"
          >
            <q-badge v-if="cartStore.totalCount > 0" color="red" floating borderless mini>
              {{ cartStore.totalCount }}
            </q-badge>
            <q-menu class="glass-dialog no-shadow" anchor="bottom right" self="top right">
              <q-list style="min-width: 300px" separator dark class="bg-black">
                <q-item-label header class="text-white text-weight-bold row items-center">
                  My Cart <q-space /> 
                  <q-btn flat round dense icon="close" size="sm" v-close-popup />
                </q-item-label>
                
                <q-item v-if="cartStore.items.length === 0" class="text-grey-5 q-pa-lg text-center">
                  Your cart is empty
                </q-item>

                <q-item v-for="item in cartStore.items" :key="item.id" class="q-py-md">
                  <q-item-section avatar>
                    <q-img :src="item.image" style="width: 40px; height: 40px; border-radius: 4px;" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white text-weight-bold">{{ item.name }}</q-item-label>
                    <q-item-label caption class="text-amber-5 text-weight-bold">
                      {{ item.quantity }} x LKR {{ item.price }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat round dense size="sm" color="red-5" icon="remove_circle" @click="cartStore.removeFromCart(item.id)" />
                  </q-item-section>
                </q-item>

                <q-separator dark />

                <div v-if="cartStore.items.length > 0" class="q-pa-md">
                  <div class="row items-center justify-between q-mb-md">
                    <div class="text-subtitle1 text-white">Total:</div>
                    <div class="text-subtitle1 text-amber-6 text-weight-bolder">LKR {{ cartStore.cartTotal }}</div>
                  </div>
                  <q-btn 
                    unelevated 
                    color="amber-6" 
                    text-color="black" 
                    label="Checkout Now" 
                    class="full-width text-weight-bold" 
                    rounded
                    to="/checkout"
                    v-close-popup
                  />
                </div>
              </q-list>
            </q-menu>
          </q-btn>

          <!-- Auth Button -->
          <q-btn 
            v-if="user && userRole !== 'customer'"
            flat 
            :round="isScrolled"
            :dense="isScrolled"
            no-caps 
            icon="admin_panel_settings" 
            :label="isScrolled ? '' : 'Dashboard'" 
            class="nav-link-btn dashboard-btn transition-all" 
            :class="{'icon-only-btn': isScrolled}"
            to="/admin/system/manage"
          />
          <q-btn 
            v-else-if="user && userRole === 'customer'"
            flat 
            :round="isScrolled"
            :dense="isScrolled"
            no-caps 
            icon="account_circle" 
            :label="isScrolled ? '' : 'Profile'" 
            class="nav-link-btn profile-btn transition-all" 
            :class="{'icon-only-btn': isScrolled}"
            to="/profile"
          />
          <q-btn 
            v-else-if="!user"
            flat 
            :round="isScrolled"
            :dense="isScrolled"
            no-caps 
            icon="login" 
            :label="isScrolled ? '' : 'Login'" 
            class="nav-link-btn login-btn transition-all" 
            :class="{'icon-only-btn': isScrolled}"
            to="/admin/auth/login"
          />
          <q-btn 
            v-else
            flat 
            :round="isScrolled"
            :dense="isScrolled"
            no-caps 
            icon="logout" 
            :label="isScrolled ? '' : 'Logout'" 
            class="nav-link-btn logout-btn transition-all" 
            :class="{'icon-only-btn': isScrolled}"
            @click="handleLogout"
          />
        </div>

        <!-- Mobile Menu -->
        <q-btn flat round dense icon="menu" :size="isScrolled ? 'md' : 'lg'" class="lt-sm" />
      </div>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'
import { useCartStore } from 'stores/cart'

const router = useRouter()
const $q = useQuasar()
const cartStore = useCartStore()
const isScrolled = ref(false)
const user = ref(null)
const userRole = ref(null)

const navButtons = [
  { label: 'Services', icon: 'design_services', action: () => scrollToId('services') },
  { label: 'Products', icon: 'inventory_2', to: '/products' },
  { label: 'Gallery', icon: 'collections' }, 
  { label: 'Contact', icon: 'mail', action: () => scrollToId('contact') }
]

function onScroll() {
  isScrolled.value = window.scrollY > 50
}

const headerStyle = computed(() => {
  return isScrolled.value 
    ? { width: 'auto', minWidth: '400px', borderRadius: '50px' } 
    : { width: '95%', maxWidth: '1200px', borderRadius: '60px' }
})

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else {
    // Navigate home first, then scroll
    router.push('/').then(() => {
      setTimeout(() => {
        const target = document.getElementById(id)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    })
  }
}

async function handleLogout() {
  await supabase.auth.signOut()
  user.value = null
  userRole.value = null
  router.push('/')
  $q.notify({
    type: 'positive',
    message: 'Logged out successful'
  })
}

onMounted(async () => {
  window.addEventListener('scroll', onScroll)
  
  // Get initial session
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  user.value = currentUser
  
  if (currentUser) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', currentUser.id)
      .maybeSingle()
    userRole.value = profile?.role
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    user.value = session?.user || null
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle()
      userRole.value = profile?.role
    } else {
      userRole.value = null
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss">
/* Container tweaks for interaction */
.pointer-events-none {
  pointer-events: none;
}
.pointer-events-auto {
  pointer-events: auto;
}

/* Top Fade Gradient Overlay */
.top-fade-overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
  height: 120px;
  z-index: 5000; /* Below header (z-max is usually 6000+ in Quasar), but above content */
  pointer-events: none;
}

/* Base Glass Bar Style */
.glass-bar {
  /* Stronger blur and saturation for premium glass feel */
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Dark Theme Bar */
.glass-bar-dark {
  background: rgba(5, 5, 5, 0.85); 
  border: 1px solid rgba(255, 193, 7, 0.3);
  
  color: white;

  /* Scrolled State: More Opaque & Distinct for Visibility */
  &.glass-bar-scrolled {
    background: rgba(10, 10, 10, 0.8) !important; /* Darker background to pop icons */
    backdrop-filter: blur(40px) saturate(200%); /* Stronger blur */
    border-color: rgba(255, 193, 7, 0.4); /* Sharper gold border */
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  }

  /* Nav Buttons */
  .nav-link-btn {
    color: #ffffff; // Pure white for max contrast
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.05);
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 10px 24px;
    border-radius: 30px;
    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);

    .q-icon {
      font-size: 1.2rem;
      margin-right: 8px;
    }

    &:hover {
      color: #000;
      background: #FFC107;
      border-color: #FFC107;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
    }
    
    /* Icon-only mode styling - Scrolled state visibility */
    &.icon-only-btn {
      padding: 14px;
      margin: 0 6px;
      border: 1.5px solid rgba(255, 255, 255, 0.4) !important; /* Stronger border */
      border-radius: 50%;
      width: 52px;
      height: 52px;
      min-width: unset;
      min-height: unset;
      background: rgba(255, 255, 255, 0.1); /* Lighter background to make icon pop */
      box-shadow: 0 0 15px rgba(0,0,0,0.4); // Subtle depth
      
      .q-icon {
        margin-right: 0;
        font-size: 1.4rem;
        color: #ffffff; // Force white
        filter: drop-shadow(0 0 5px rgba(0,0,0,1)); // Subtle glow for icon
      }
      
      &:hover {
         border-radius: 50%;
         border-color: #FFC107;
         transform: scale(1.15);
         background: #FFC107; 
         color: black;
         .q-icon {
           color: black;
           filter: none;
         }
      }
    }
  }

  .nav-icon-btn {
    color: #e0e0e0;
    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    opacity: 0.8;
    
    &:hover {
      color: #FFC107;
      opacity: 1;
      transform: scale(1.1);
    }
  }
}

.vertical-separator {
  width: 1px;
  background: rgba(255, 255, 255, 0.2) !important;
  transition: height 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.letter-spacing-md {
  letter-spacing: 2px;
}

.title-glow {
  text-shadow: 0 0 20px rgba(255, 193, 7, 0.3);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  
  &:hover {
    text-shadow: 0 0 30px rgba(255, 193, 7, 0.6);
  }
}

.transition-all {
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); /* Ultra Smooth Global */
}
</style>
