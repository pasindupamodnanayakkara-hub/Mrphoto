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
        
        <div class="services-showcase row no-wrap q-col-gutter-lg">
          <div 
            v-for="(service, index) in services" 
            :key="index" 
            class="service-col-wrapper transition-all"
            :class="{ 
              'is-expanded': expandedServiceId === service.id,
              'is-shrunk': expandedServiceId && expandedServiceId !== service.id
            }"
          >
            <!-- Glass Card: Natural Height Flow -->
            <q-card class="glass-card no-shadow full-height relative-position overflow-hidden">
              
              <!-- Service Background Image (Visible when expanded/shrunk) -->
              <div class="absolute-full service-bg-overlay opacity-20" :style="{ backgroundImage: `url(${service.image})` }"></div>

              <div class="column no-wrap full-height relative-position z-top">
                <!-- Image Container (Always visible) -->
                <div class="q-pa-md shrink-0">
                   <div class="overflow-hidden relative-position border-radius-sm img-container">
                    <q-img 
                      :src="service.image" 
                      :ratio="expandedServiceId === service.id ? 16/9 : 1"
                      class="service-img"
                    />
                    <div class="absolute-full hover-overlay transition-opacity"></div>
                  </div>
                </div>

                <!-- Content Section -->
                <q-card-section class="q-px-lg q-pb-lg q-pt-sm grow">
                  <div class="row items-center justify-between no-wrap">
                    <h4 class="text-h5 text-weight-bold q-mb-xs text-uppercase service-title ellipsis">{{ service.name }}</h4>
                    <q-btn 
                      v-if="expandedServiceId === service.id" 
                      flat round icon="close" 
                      color="white" 
                      @click.stop="expandedServiceId = null" 
                      size="sm"
                    />
                  </div>

                  <div class="service-description-container">
                    <p class="text-grey-4 text-body2 leading-relaxed" :class="{ 'ellipsis-2-lines': !expandedServiceId || expandedServiceId !== service.id }">
                      {{ service.description }}
                    </p>
                  </div>
                  
                  <!-- Expanded Details -->
                  <div v-show="expandedServiceId === service.id" class="q-mt-md animate-fade-in">
                    <div class="row q-col-gutter-lg q-pt-md">
                      <div class="col-12 col-md-6">
                        <div class="text-subtitle2 text-amber-6 text-uppercase q-mb-sm letter-spacing-md">Our Approach</div>
                        <div class="text-grey-3 text-body2 leading-relaxed text-italic">
                          {{ service.detailed_description || 'Our specialized approach ensures your moments are captured with absolute perfection and high-end artistic vision.' }}
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="text-subtitle2 text-amber-6 text-uppercase q-mb-sm letter-spacing-md">Premium Features</div>
                        <q-list dense dark class="text-grey-3 q-gutter-y-xs">
                          <q-item v-for="(feat, fIdx) in (service.features || ['High-end quality', 'Custom artistic touch', 'Fast delivery'])" :key="fIdx" class="q-px-none min-height-0">
                            <q-item-section avatar class="min-width-0 q-pr-sm">
                              <q-icon name="stars" color="amber-6" size="xs" />
                            </q-item-section>
                            <q-item-section class="text-caption">{{ feat }}</q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </div>
                  </div>

                  <div class="q-mt-md" v-if="expandedServiceId !== service.id">
                     <q-btn 
                       flat dense no-caps 
                       class="text-amber text-weight-bold text-caption letter-spacing-md" 
                       label="Learn More" 
                       icon-right="arrow_forward" 
                       @click="expandedServiceId = service.id"
                     />
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Happy Moments Gallery Strip -->
    <section class="q-py-xl bg-black overflow-hidden">
      <div class="q-container container q-mx-auto">
        <div class="row items-center q-mb-xl">
          <div class="column">
            <h3 class="text-h3 text-weight-thin q-ma-none text-uppercase">Happy <span class="text-weight-bold text-amber-6">Moments</span></h3>
            <div class="text-subtitle1 text-grey-5 letter-spacing-md">Real stories from our frame gallery</div>
          </div>
          <q-space />
          <div class="gt-xs text-grey-6 text-caption text-uppercase letter-spacing-lg">Delivering Joy Daily</div>
        </div>

        <div v-if="galleryPhotos.length" class="row q-col-gutter-lg">
          <div v-for="photo in galleryPhotos.slice(0, 4)" :key="photo.id" class="col-12 col-sm-6 col-md-3">
            <q-card class="glass-card hover-lift overflow-hidden no-shadow">
              <q-img :src="photo.image_url" :ratio="1" class="transition-all hover-scale" />
              <div class="absolute-bottom bg-gradient-dark q-pa-sm text-center">
                <div class="text-caption text-white text-italic">{{ photo.caption }}</div>
              </div>
            </q-card>
          </div>
        </div>
        <div v-else class="text-center q-pa-xl text-grey-7">Our gallery is coming soon...</div>
      </div>
    </section>

    <!-- Why Choose Us / Quality Strip -->
    <section class="q-py-xl relative-position overflow-hidden">
      <!-- Background with subtle gradient -->
      <div class="absolute-full bg-gradient-dark"></div>
      
      <div class="q-container container relative-position z-top">
        <div class="row justify-evenly items-center q-col-gutter-y-lg text-center">
          
          <!-- Stat 1 -->
          <div class="col-12 col-sm-4 stat-item">
            <q-icon :name="businessStats.stat1.icon" size="3.5em" color="amber" class="q-mb-md stat-icon" />
            <div class="text-h2 text-weight-bolder logo-colored-text stat-number q-mb-sm">{{ businessStats.stat1.value }}</div>
            <div class="text-subtitle1 text-uppercase text-grey-4 letter-spacing-md text-weight-medium">{{ businessStats.stat1.label }}</div>
          </div>

          <!-- Stat 2 -->
          <div class="col-12 col-sm-4 stat-item border-x-glass">
            <q-icon :name="businessStats.stat2.icon" size="3.5em" color="amber" class="q-mb-md stat-icon" />
            <div class="text-h2 text-weight-bolder logo-colored-text stat-number q-mb-sm">{{ businessStats.stat2.value }}</div>
            <div class="text-subtitle1 text-uppercase text-grey-4 letter-spacing-md text-weight-medium">{{ businessStats.stat2.label }}</div>
          </div>

          <!-- Stat 3 -->
          <div class="col-12 col-sm-4 stat-item">
            <q-icon :name="businessStats.stat3.icon" size="3.5em" color="amber" class="q-mb-md stat-icon" />
            <div class="text-h2 text-weight-bolder logo-colored-text stat-number q-mb-sm">{{ businessStats.stat3.value }}</div>
            <div class="text-subtitle1 text-uppercase text-grey-4 letter-spacing-md text-weight-medium">{{ businessStats.stat3.label }}</div>
          </div>

        </div>
      </div>
    </section>

    <!-- Customer Testimonials Section -->
    <section class="q-py-xl bg-black relative-position overflow-hidden">
       <!-- Decorative background blur -->
      <div class="absolute-left full-height width-1_2 bg-gradient-gold opacity-5 blur-150" style="transform: skewX(-20deg);"></div>

      <div class="q-container container relative-position z-top">
        <div class="text-center q-mb-xl">
          <h2 class="text-h2 text-weight-thin q-ma-none text-uppercase">Client <span class="text-weight-bold text-amber-6">Stories</span></h2>
          <p class="text-grey-5 text-h6 text-weight-light">What our amazing customers have to say about us</p>
        </div>

        <div class="row q-col-gutter-xl">
          <div v-for="review in publicReviews" :key="review.id" class="col-12 col-md-4">
            <q-card class="glass-card full-height q-pa-lg no-shadow">
              <div class="row items-center q-mb-md">
                <q-avatar size="40px" color="amber-9" text-color="black" class="text-weight-bold">
                  {{ review.customer_name.charAt(0) }}
                </q-avatar>
                <div class="q-ml-md">
                  <div class="text-subtitle1 text-weight-bold text-white">{{ review.customer_name }}</div>
                  <q-rating
                    v-model="review.rating"
                    size="14px"
                    color="amber-6"
                    readonly
                  />
                </div>
              </div>
              <p class="text-grey-4 text-body1 text-italic">"{{ review.comment }}"</p>
              <div class="text-caption text-grey-6 text-right">— {{ new Date(review.created_at).toLocaleDateString() }}</div>
            </q-card>
          </div>
        </div>

        <div class="text-center q-mt-xl">
          <q-btn 
            flat no-caps 
            class="text-amber-6 text-weight-bold border-gold-btn q-px-xl" 
            label="Share Your Experience" 
            icon="rate_review"
            @click="showReviewDialog = true"
          />
        </div>
      </div>
    </section>

    <!-- Feedback Submission Dialog -->
    <q-dialog v-model="showReviewDialog" persistent>
      <q-card class="glass-dialog" style="min-width: 400px; border-radius: 20px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-white text-uppercase letter-spacing-md">Your Feedback</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup color="grey" />
        </q-card-section>

        <q-card-section class="q-gutter-y-md q-pt-lg">
          <div class="text-center">
            <div class="text-grey-5 q-mb-sm">Rate your experience</div>
            <q-rating
              v-model="newReview.rating"
              size="2.5em"
              color="amber-6"
              icon="star_border"
              icon-selected="star"
              class="animate-pop"
            />
          </div>

          <q-input 
            v-model="newReview.customer_name" 
            label="Your Name" 
            outlined dark color="amber-6" 
            class="input-glass" 
          />
          
          <q-input 
            v-model="newReview.comment" 
            label="Your Message" 
            type="textarea"
            outlined dark color="amber-6" 
            class="input-glass" 
          />
        </q-card-section>

        <q-card-actions align="center" class="q-pb-xl q-px-lg">
          <q-btn 
            class="btn-premium-save full-width" 
            label="Submit My Story" 
            icon="send" 
            @click="submitReview"
            :loading="submittingReview"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
                  @click="sendMessage"
                  :loading="sending"
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
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
// Force Dark Mode
$q.dark.set(true)

const cursorStyle = ref({
  left: '0px',
  top: '0px'
})

const services = ref([])
const expandedServiceId = ref(null)
const publicReviews = ref([])
const galleryPhotos = ref([])
const businessStats = ref({
  stat1: { label: 'Daily Projects', value: '100+', icon: 'collections' },
  stat2: { label: 'Experience', value: '10y', icon: 'history_edu' },
  stat3: { label: 'Satisfaction', value: '100%', icon: 'workspace_premium' }
})

const showReviewDialog = ref(false)
const submittingReview = ref(false)
const newReview = ref({
  customer_name: '',
  rating: 5,
  comment: ''
})

async function fetchStats() {
  try {
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'business_stats')
      .maybeSingle()
    
    if (data && data.value) {
      businessStats.value = data.value
    }
  } catch (err) {
    console.error('Error fetching stats:', err)
  }
}

async function fetchServices() {
  const { data } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true })
  
  if (data) {
    services.value = data
  }
}

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)

async function sendMessage() {
  if (!name.value || !message.value) {
    $q.notify({ type: 'warning', message: 'Please fill in required fields' })
    return
  }

  sending.value = true
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([{
        name: name.value,
        email: email.value,
        message: message.value,
        subject: 'Website Inquiry'
      }])

    if (error) throw error

    $q.notify({
      type: 'positive',
      message: 'Message sent successfully! We will get back to you soon.',
      icon: 'done_all'
    })

    // Reset form
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to send message. Please try again.' })
  } finally {
    sending.value = false
  }
}

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


async function fetchPublicReviews() {
  try {
    const { data } = await supabase
      .from('feedbacks')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(6)
    if (data) publicReviews.value = data
  } catch (err) {
    console.error('Error fetching reviews:', err)
  }
}

async function fetchGalleryPhotos() {
  try {
    const { data } = await supabase
      .from('rating_photos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8)
    if (data) galleryPhotos.value = data
  } catch (err) {
    console.error('Error fetching photos:', err)
  }
}

async function submitReview() {
  if (!newReview.value.customer_name || !newReview.value.comment) {
    $q.notify({ type: 'warning', message: 'Please fill in your name and comment' })
    return
  }
  
  submittingReview.value = true
  try {
    const { error } = await supabase
      .from('feedbacks')
      .insert([newReview.value])
    
    if (error) throw error
    
    $q.notify({
      type: 'positive',
      message: 'Thank you for your feedback! It will appear live shortly.',
      icon: 'stars'
    })
    
    showReviewDialog.value = false
    newReview.value = { customer_name: '', rating: 5, comment: '' }
    fetchPublicReviews()
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to submit feedback' })
  } finally {
    submittingReview.value = false
  }
}

onMounted(() => {
  fetchServices()
  fetchStats()
  fetchPublicReviews()
  fetchGalleryPhotos()
})
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

/* Services Showcase Styling */
.services-showcase {
  display: flex !important;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 550px;
  will-change: transform;
}

.service-col-wrapper {
  flex: 1;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  max-width: 100%;
  will-change: flex, opacity, filter;
  
  &.is-expanded {
    flex: 4;
    z-index: 100;
    @media (max-width: 1024px) {
      flex: 100%;
    }
  }
  
  &.is-shrunk {
    flex: 0.3;
    opacity: 0.3;
    filter: blur(4px) grayscale(1);
    pointer-events: none;
    
    @media (max-width: 768px) {
      display: none; 
    }
  }
}

.service-bg-overlay {
  background-size: cover;
  background-position: center;
  filter: blur(40px);
  pointer-events: none;
  transform: scale(1.1);
  transition: opacity 0.8s ease;
}

.animate-fade-in {
  animation: premiumExpand 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes premiumExpand {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.min-height-0 {
  min-height: 0;
}
.min-width-0 {
  min-width: 0;
}
.shrink-0 {
  flex-shrink: 0;
}
.grow {
  flex-grow: 1;
}

.border-gold-btn {
  border: 1px solid rgba(255, 193, 7, 0.4);
  border-radius: 50px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 193, 7, 0.1);
    border-color: #FFC107;
    transform: scale(1.05);
  }
}

.hover-lift {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(255, 193, 7, 0.2) !important;
  }
}

.hover-scale {
  &:hover {
    transform: scale(1.1);
  }
}

.glass-dialog {
  background: rgba(15, 15, 15, 0.8) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
