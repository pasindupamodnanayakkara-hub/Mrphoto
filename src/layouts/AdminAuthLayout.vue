<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="auth-layout">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.auth-layout {
  background: #000; /* Fallback */
  background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%);
  min-height: 100vh;
}
</style>
