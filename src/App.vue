<template>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const preventContext = (e) => {
  // Prevent context menu on images or elements with background images
  const target = e.target
  if (target.tagName === 'IMG' || target.style.backgroundImage || target.classList.contains('q-img__image')) {
    e.preventDefault()
  }
}

const preventDrag = (e) => {
  // Prevent dragging images
  if (e.target.tagName === 'IMG') {
    e.preventDefault()
  }
}

onMounted(() => {
  document.addEventListener('contextmenu', preventContext)
  document.addEventListener('dragstart', preventDrag)
})

onUnmounted(() => {
  document.removeEventListener('contextmenu', preventContext)
  document.removeEventListener('dragstart', preventDrag)
})
</script>
