<template>
  <q-page class="error-page bg-black flex flex-center">
    <div class="container text-center q-pa-lg">
      <q-card class="glass-error-card q-pa-xl no-shadow">
        <div class="text-h1 text-weight-bold text-amber-6 q-mb-md">404</div>
        <div class="text-h4 text-white text-weight-medium q-mb-lg">Page Not Found</div>
        
        <p class="text-grey-5 text-body1 q-mb-xl text-center max-width-p">
          We're sorry, the page you're looking for doesn't exist or has been moved.
          Please check the URL or return to our homepage.
        </p>

        <div class="row justify-center q-gutter-md">
          <q-btn
            outline
            color="grey-5"
            label="Go Back"
            v-go-back
            icon="arrow_back"
            padding="12px 24px"
          />
          <q-btn
            class="btn-premium-save"
            icon="home"
            label="Return Home"
            to="/"
          />
        </div>
      </q-card>
      
      <div class="q-mt-xl">
        <div class="text-h6 text-weight-bold text-uppercase logo-colored-text">Mr. Photo Studio</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// No extra logic needed
</script>

<style lang="scss" scoped>
.error-page {
  background: #0a0a0a;
}

.glass-error-card {
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.max-width-p {
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}

.text-h1 {
  font-size: 8rem;
  letter-spacing: -2px;
}
</style>
