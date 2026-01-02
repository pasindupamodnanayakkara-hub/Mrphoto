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

const isScrolled = ref(false)

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
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
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

  /* Scrolled State: More Transparent & Glassy */
  &.glass-bar-scrolled {
    background: rgba(0, 0, 0, 0.4); /* Much more transparent */
    backdrop-filter: blur(30px) saturate(180%); /* Stronger blur */
    border-color: rgba(255, 193, 7, 0.15); /* Subtler border */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  /* Nav Buttons */
  .nav-link-btn {
    color: #e0e0e0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 10px 24px;
    border-radius: 30px;
    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); /* Ultra Smooth */

    
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
    
    /* Icon-only mode styling - Larger & Smoother */
    &.icon-only-btn {
      padding: 14px;
      margin: 0 8px; /* Increased spacing */
      border: 1px solid rgba(255, 255, 255, 0.3); /* Much clearer border */
      border-radius: 50%;
      width: 54px; /* Slightly larger */
      height: 54px;
      min-width: unset;
      min-height: unset;
      background: rgba(255, 255, 255, 0.05); /* Slight fill to pop against dark header */
      
      .q-icon {
        margin-right: 0;
        font-size: 1.5rem; 
      }
      
      &:hover {
         border-radius: 50%;
         border-color: #FFC107; /* Gold border on hover */
         transform: scale(1.15);
         background: rgba(255, 193, 7, 0.9); 
         color: black;
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
