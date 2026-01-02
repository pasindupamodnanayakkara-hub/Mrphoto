<template>
  <q-page class="bg-black text-white font-roboto" @mousemove="onMouseMove">
    <div class="cursor-glow" :style="cursorStyle"></div>
    
    <!-- Hero Section -->
    <div class="hero-section relative-position flex flex-center overflow-hidden">
      <q-img
        src="~assets/hero_studio.png"
        class="absolute-full hero-bg"
        fit="cover"
        style="opacity: 0.6"
      >
        <template v-slot:loading>
          <div class="text-white">Loading...</div>
        </template>
      </q-img>
      
      <div class="hero-content column flex-center z-top q-pa-md" data-aos="fade-up">
        <!-- Sample Logo Placeholder -->
        <q-img
          src="~assets/logo.png"
          width="180px"
          class="q-mb-md logo-pop"
        />

        <h1 class="text-h2 text-weight-bolder q-mb-sm text-uppercase letter-spacing-lg glass-title q-px-xl q-py-sm logo-colored-text logo-pop">
          Mr. Photo
        </h1>
        
        <div class="separator q-mx-auto q-mb-md"></div>
        <div class="q-mb-xl">
          <p class="text-h6 text-weight-300 text-uppercase text-white glass-subtitle q-px-lg q-py-sm inline-block q-ma-none">
            Design &middot; Laminating &middot; Framing
          </p>
        </div>

        <div class="q-mb-lg text-center" style="max-width: 700px">
          <h2 class="text-h4 text-weight-light q-mb-md text-white">Preserving Moments, Elevating Art</h2>
          <p class="text-body1 text-white text-weight-300 leading-relaxed">
            At Mr. Photo, we specialize in transforming your cherished memories into timeless masterpieces. 
            From precision photo editing to high-quality laminating and bespoke framing, 
            we bring a professional touch to every image.
          </p>
        </div>

      </div>
      
      <div class="absolute-bottom text-center q-mb-xl q-pb-xl z-top">
        <q-btn
          rounded
          unelevated
          color="white"
          text-color="black"
          label="Explore Services"
          icon-right="arrow_forward"
          class="q-px-xl q-py-md text-weight-bolder btn-luxury"
          @click="scrollToServices"
        />
      </div>

    </div>

    <!-- Services Section -->
    <section id="services" class="q-py-xl bg-black relative-position">
      <!-- Background Glow for Glass Effect -->
      <div class="absolute-center bg-amber-9 opacity-20 blur-150" style="width: 80%; height: 80%; pointer-events: none;"></div>

      <div class="q-container container q-mx-auto relative-position" style="position: relative; z-index: 10;">
        <h3 class="text-h3 text-weight-thin text-center q-mb-xl text-uppercase">Our Services</h3>
        
        <div class="row q-col-gutter-xl justify-center">
          <div v-for="(service, index) in services" :key="index" class="col-12 col-md-4">
            <!-- Glass Card: Natural Height Flow -->
            <q-card class="glass-card no-shadow">
              
              <!-- Image Container -->
              <div class="q-pa-md">
                 <div class="overflow-hidden relative-position border-radius-sm img-container">
                  <q-img 
                    :src="service.image" 
                    :ratio="1"
                    class="service-img"
                  />
                  <!-- Hover Overlay -->
                  <div class="absolute-full hover-overlay transition-opacity"></div>
                </div>
              </div>

              <!-- Content Section -->
              <q-card-section class="q-px-lg q-pb-lg q-pt-sm">
                <h4 class="text-h5 text-weight-bold q-mb-sm text-uppercase service-title">{{ service.name }}</h4>
                <p class="text-grey-4 text-body2 leading-relaxed">
                  {{ service.description }}
                </p>
                
                <div class="q-mt-md">
                   <q-btn flat dense no-caps class="text-amber text-weight-bold text-caption letter-spacing-md" label="Learn More" icon-right="arrow_forward" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us / Quality Strip -->
    <section class="q-py-xl relative-position overflow-hidden q-mt-xl">
      <!-- Background with subtle gradient -->
      <div class="absolute-full bg-gradient-dark"></div>
      
      <div class="q-container container relative-position z-top">
        <div class="row justify-evenly items-center q-col-gutter-y-lg text-center">
          
          <!-- Stat 1 -->
          <div class="col-12 col-sm-4 stat-item">
            <q-icon name="collections" size="3.5em" color="amber" class="q-mb-md stat-icon" />
            <div class="text-h2 text-weight-bolder logo-colored-text stat-number q-mb-sm">100+</div>
            <div class="text-subtitle1 text-uppercase text-grey-4 letter-spacing-md text-weight-medium">Daily Projects</div>
          </div>

          <!-- Stat 2 -->
          <div class="col-12 col-sm-4 stat-item border-x-glass">
            <q-icon name="history_edu" size="3.5em" color="amber" class="q-mb-md stat-icon" />
            <div class="text-h2 text-weight-bolder logo-colored-text stat-number q-mb-sm">10y</div>
            <div class="text-subtitle1 text-uppercase text-grey-4 letter-spacing-md text-weight-medium">Experience</div>
          </div>

          <!-- Stat 3 -->
          <div class="col-12 col-sm-4 stat-item">
            <q-icon name="workspace_premium" size="3.5em" color="amber" class="q-mb-md stat-icon" />
            <div class="text-h2 text-weight-bolder logo-colored-text stat-number q-mb-sm">100%</div>
            <div class="text-subtitle1 text-uppercase text-grey-4 letter-spacing-md text-weight-medium">Satisfaction</div>
          </div>

        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="q-py-xl bg-black relative-position overflow-hidden">
      <!-- Decorative background blur -->
      <div class="absolute-right full-height width-1_2 bg-gradient-gold opacity-10 blur-100"></div>

      <div class="container relative-position z-top">
        <div class="row justify-between items-center q-col-gutter-xl">
          
          <!-- Contact Info -->
          <div class="col-12 col-md-5">
            <h2 class="text-h3 text-weight-thin text-uppercase q-mb-md">Let's Create<br><span class="text-weight-bold text-amber-500">Together</span></h2>
            <p class="text-grey-5 text-body1 q-mb-xl">
              Ready to bring your vision to life? Visit our studio or drop us a line.
              We are waiting to capture your best moments.
            </p>

            <div class="q-gutter-y-lg">
              <div class="row items-center">
                <q-icon name="location_on" color="amber" size="sm" class="q-mr-md" />
                <div>
                  <div class="text-subtitle1 text-weight-bold">Our Studio</div>
                  <div class="text-caption text-grey-5">123, High Level Road, Colombo, Sri Lanka</div>
                </div>
              </div>

              <div class="row items-center">
                <q-icon name="phone" color="amber" size="sm" class="q-mr-md" />
                <div>
                  <div class="text-subtitle1 text-weight-bold">Call Us</div>
                  <div class="text-caption text-grey-5">+94 77 123 4567</div>
                </div>
              </div>

              <div class="row items-center">
                <q-icon name="mail" color="amber" size="sm" class="q-mr-md" />
                <div>
                  <div class="text-subtitle1 text-weight-bold">Email Us</div>
                  <div class="text-caption text-grey-5">hello@mrphoto.lk</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="col-12 col-md-6">
            <q-card class="glass-form q-pa-lg">
              <div class="text-h5 text-weight-bold q-mb-lg">Send a Message</div>
              <q-form class="q-gutter-md">
                <q-input 
                  dark 
                  filled 
                  v-model="name" 
                  label="Your Name" 
                  class="glass-input"
                  color="amber"
                />
                <q-input 
                  dark 
                  filled 
                  v-model="email" 
                  label="Your Email" 
                  class="glass-input"
                  color="amber"
                />
                <q-input 
                  dark 
                  filled 
                  v-model="message" 
                  label="Your Message" 
                  type="textarea" 
                  class="glass-input"
                  color="amber"
                />
                <q-btn 
                  unelevated 
                  label="Send Message" 
                  class="full-width bg-amber-8 text-black text-weight-bold q-py-sm"
                />
              </q-form>
            </q-card>
          </div>

        </div>
      </div>
    </section>

    <!-- Footer -->
    <!-- Footer -->
    <footer class="bg-black text-white relative-position overflow-hidden">
      <!-- Top Glass Border -->
      <div class="absolute-top full-width" style="height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 193, 7, 0.5), transparent);"></div>
      
      <div class="q-container container q-py-xl">
        <div class="row items-center justify-between q-col-gutter-y-md">
          
          <!-- Brand -->
          <div class="col-12 col-md-auto text-center text-md-left">
            <div class="text-h5 text-weight-bold letter-spacing-lg text-uppercase logo-colored-text">Mr. Photo</div>
            <div class="text-caption text-grey-5 q-mt-xs">Professional Studio &amp; Framing</div>
          </div>

          <!-- Social Links -->
          <div class="col-12 col-md-auto text-center">
            <div class="q-gutter-x-md">
              <q-btn flat round color="amber" icon="mdi-facebook" class="footer-icon-btn" />
              <q-btn flat round color="amber" icon="mdi-instagram" class="footer-icon-btn" />
              <q-btn flat round color="amber" icon="mdi-whatsapp" class="footer-icon-btn" />
            </div>
          </div>

          <!-- Copyright -->
          <div class="col-12 col-md-auto text-center text-md-right">
            <p class="text-grey-6 text-caption q-mb-none font-roboto">
              &copy; {{ new Date().getFullYear() }} Mr. Photo Studio.<br>All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
// Force Dark Mode
$q.dark.set(true)

const cursorStyle = ref({
  left: '0px',
  top: '0px'
})



const services = [
  {
    name: 'Bespoke Framing',
    description: 'Handcrafted frames designed to complement your art. Minimalist, vintage, or modern styles available.',
    image: 'src/assets/framing.png'
  },
  {
    name: 'Professional Laminating',
    description: 'Protect your documents and photos with our premium matte and glossy finish lamination services.',
    image: 'src/assets/laminating.png'
  },
  {
    name: 'Creative Design',
    description: 'Expert photo retouching, restoration, and graphic design tailored to your unique vision.',
    image: 'src/assets/hero_studio.png'
  }
]

const name = ref('')
const email = ref('')
const message = ref('')

function onMouseMove(e) {
  cursorStyle.value = {
    left: `${e.clientX}px`,
    top: `${e.clientY}px`
  }
}

function scrollToServices() {
  const el = document.getElementById('services')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style lang="scss" scoped>
.font-roboto {
  font-family: 'Roboto', sans-serif;
}

.hero-section {
  height: 100vh;
  position: relative;
}

.hero-bg {
  filter: grayscale(100%) contrast(110%);
}

.letter-spacing-lg {
  letter-spacing: 0.2em;
}

.letter-spacing-md {
  letter-spacing: 0.1em;
}

.separator {
  width: 60px;
  height: 2px;
  background-color: white;
}

.explore-btn {
  transition: all 0.3s ease;
  &:hover {
    background: white;
    color: black !important;
  }
}

.service-card {
  &:hover {
    .service-img {
      transform: scale(1.05);
    }
  }
}

.service-img {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: grayscale(100%);
}

.border-radius-sm {
  border-radius: 4px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.leading-relaxed {
  line-height: 1.8;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.border-top-grey {
  border-top: 1px solid #333;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.glass-subtitle {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  display: inline-block;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}

.glass-title {
  background: rgba(255, 193, 7, 0.1); /* Golden liquid tint */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 193, 7, 0.5); /* Gold border */
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 193, 7, 0.15); /* Inner gold glow for liquid feel */
  border-radius: 20px;
  display: inline-block;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

.btn-luxury {
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  transition: all 0.4s ease;
  
  /* Initial state styling */
  border: 2px solid white;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 50px rgba(255, 255, 255, 0.8);
    letter-spacing: 3px;
    background-color: white;
  }

  /* Target the icon for animation */
  :deep(.q-icon) {
    transition: transform 0.3s ease;
  }
  
  &:hover :deep(.q-icon) {
    transform: translateX(5px);
  }
}


.logo-pop {
  filter: drop-shadow(0 0 25px rgba(255, 193, 7, 0.3));
  transition: transform 0.3s ease, filter 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 35px rgba(255, 193, 7, 0.5));
  }
}

.logo-colored-text {
  background: linear-gradient(135deg, #FFC107 0%, #FFFFFF 50%, #00BCD4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; /* Standard property for compatibility */
  text-shadow: 0 5px 15px rgba(0,0,0,0.3); /* Subtle shadow to lift it */
  position: relative;
  z-index: 10;
}

.cursor-glow {
  position: fixed;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 193, 7, 0.35) 0%, rgba(255, 193, 7, 0.15) 30%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0; /* Keep it behind content effectively by being low in stack relative to z-top items */
  border-radius: 50%;
  mix-blend-mode: screen;
  filter: blur(50px);
  transition: opacity 0.3s ease;
}




.bg-gradient-dark {
  background: linear-gradient(180deg, #101010 0%, #050505 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-item {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 20px 0;
  
  &:hover {
    transform: translateY(-5px);
    
    .stat-icon {
      transform: scale(1.1) rotate(5deg);
      text-shadow: 0 0 20px rgba(255, 193, 7, 0.4);
    }
  }
}

.stat-icon {
  transition: all 0.4s ease;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
}

.stat-number {
  font-size: 3.5rem;
  line-height: 1.1;
  /* Ensure the gradient text works nicely */
  display: inline-block;
}

@media (min-width: 600px) {
  .border-x-glass {
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }
}


.glass-form {
  background: rgba(30, 30, 30, 0.4); /* Lighter, more visible glass */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1); /* Slightly distinct border */
  border-radius: 16px;
}

.glass-input {
  .q-field__control {
    background: rgba(255, 255, 255, 0.05) !important; /* Lighter input bg */
  }
}

.bg-gradient-gold {
  background: radial-gradient(circle at center, #FFC107, transparent);
}

.opacity-10 {
  opacity: 0.15; /* Increased ambient light */
}

.blur-100 {
  filter: blur(100px);
}
.glass-card {
  background: rgba(30, 30, 30, 0.3); /* Lighter base for cards */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12); /* Pop the border */
  border-radius: 12px;
  transition: all 0.4s ease;

  &:hover {
    border-color: rgba(255, 193, 7, 0.4);
    background: rgba(40, 40, 40, 0.5); /* Lighter on hover */
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);

    .service-title {
      color: #FFC107;
    }
    
    .img-container {
      border-color: rgba(255, 193, 7, 0.2);
    }
  }
}

.img-container {
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: border-color 0.4s ease;
}

.service-title {
  transition: color 0.3s ease;
}

.hover-overlay {
  background: rgba(0,0,0,0.2);
  opacity: 0;
  
  .glass-card:hover & {
    opacity: 1;
  }
}
.footer-icon-btn {
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);

  &:hover {
    background: rgba(255, 193, 7, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 193, 7, 0.2);
    color: white !important;
  }
}

.opacity-20 {
  opacity: 0.3; /* Increased section glow */
}

.blur-150 {
  filter: blur(150px);
}

.width-1_2 {
  width: 50%;
}


</style>
