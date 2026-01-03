<template>
  <q-page class="bg-black text-white font-roboto">
    
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
    
    <!-- Gold Shadow Transition -->
    <div class="gold-separator-top" style="top: 100vh;"></div>

    </div>

    <!-- Services Section -->
    <section id="services" class="q-py-xl bg-black relative-position reveal-item">
      <!-- Muted Dark Ambient Glow -->
      <div class="absolute-center bg-grey-10 opacity-10 blur-150" style="width: 100%; height: 100%; pointer-events: none;"></div>

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
                        <div class="text-subtitle2 text-amber-gold text-uppercase q-mb-sm letter-spacing-md">Our Approach</div>
                        <div class="text-grey-3 text-body2 leading-relaxed text-italic">
                          {{ service.detailed_description || 'Our specialized approach ensures your moments are captured with absolute perfection and high-end artistic vision.' }}
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="text-subtitle2 text-grey-5 text-uppercase q-mb-sm letter-spacing-md">Premium Features</div>
                        <q-list dense dark class="text-grey-4 q-gutter-y-xs">
                          <q-item v-for="(feat, fIdx) in (service.features || ['High-end quality', 'Custom artistic touch', 'Fast delivery'])" :key="fIdx" class="q-px-none min-height-0">
                            <q-item-section avatar class="min-width-0 q-pr-sm">
                              <q-icon name="stars" color="grey-7" size="xs" />
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


    <!-- Why Choose Us / Quality Strip -->
    <section class="q-py-xl relative-position overflow-hidden bg-black reveal-item">
      <!-- Background with subtle dark gradient -->
      <div class="absolute-full" style="background: linear-gradient(180deg, #000 0%, #050505 100%);"></div>
      
      <div class="q-container container relative-position z-top">
        <div class="row justify-evenly items-center q-col-gutter-y-lg text-center">
          
          <!-- Stat 1 -->
          <div class="col-12 col-sm-4 stat-item">
            <q-icon :name="businessStats.stat1.icon" size="3.5em" color="grey-6" class="q-mb-md stat-icon" />
            <div class="text-h2 text-weight-bolder logo-colored-text stat-number q-mb-sm">{{ businessStats.stat1.value }}</div>
            <div class="text-subtitle1 text-uppercase text-grey-6 letter-spacing-md text-weight-medium">{{ businessStats.stat1.label }}</div>
          </div>

          <!-- Stat 2 -->
          <div class="col-12 col-sm-4 stat-item border-x-glass">
            <q-icon :name="businessStats.stat2.icon" size="3.5em" color="grey-6" class="q-mb-md stat-icon" />
            <div class="text-h2 text-weight-bolder logo-colored-text stat-number q-mb-sm">{{ businessStats.stat2.value }}</div>
            <div class="text-subtitle1 text-uppercase text-grey-6 letter-spacing-md text-weight-medium">{{ businessStats.stat2.label }}</div>
          </div>

          <!-- Stat 3 -->
          <div class="col-12 col-sm-4 stat-item">
            <q-icon :name="businessStats.stat3.icon" size="3.5em" color="grey-6" class="q-mb-md stat-icon" />
            <div class="text-h2 text-weight-bolder logo-colored-text stat-number q-mb-sm">{{ businessStats.stat3.value }}</div>
            <div class="text-subtitle1 text-uppercase text-grey-6 letter-spacing-md text-weight-medium">{{ businessStats.stat3.label }}</div>
          </div>

        </div>
      </div>
    </section>

    <!-- Customer Testimonials Section -->
    <section class="q-py-xl bg-black relative-position overflow-hidden reveal-item">
      <!-- Super Subtle Off-White Ambient Glow -->
      <div class="absolute-center full-width full-height opacity-5 blur-150" style="background: radial-gradient(circle, #444 0%, transparent 80%);"></div>

      <div class="q-container container relative-position z-top">
        <div class="text-center q-mb-xl">
          <h2 class="text-h2 text-weight-thin q-ma-none text-uppercase">Client <span class="text-weight-bold text-amber-gold">Stories</span></h2>
          <p class="text-grey-5 text-h6 text-weight-light">What our amazing customers have to say about us</p>
        </div>

        <div class="row justify-center q-col-gutter-lg">
          <!-- Unified Community Dashboard -->
          <div class="col-12 col-md-10">
            <q-card class="glass-card-solid q-pa-xl no-shadow overflow-hidden relative-position" style="background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.05);">
              <!-- Decorative background glow - muted charcoal -->
              <div class="absolute-right full-height width-1_2 opacity-5 blur-150 rounded-borders" style="background: #444;"></div>
              
              <div class="row q-col-gutter-xl items-center relative-position z-top">
                <!-- Analytics Section -->
                <div class="col-12 col-md-6 border-right-glass-desktop">
                  <div v-if="publicReviews.length > 0">
                    <div class="row items-center justify-center q-mb-lg">
                       <div class="column flex-center q-mr-xl">
                         <div class="text-h1 text-weight-bolder text-amber-gold line-height-1">{{ averageRating }}</div>
                         <q-rating
                           :model-value="averageRatingNumber"
                           size="28px"
                           color="amber-6"
                           readonly
                         />
                         <div class="text-caption text-grey-5 q-mt-sm text-uppercase letter-spacing-md">{{ publicReviews.length }} Reviews</div>
                       </div>
                       <div class="column grow q-gutter-y-sm" style="max-width: 250px;">
                         <div v-for="n in [5,4,3,2,1]" :key="n" class="row items-center no-wrap">
                           <div class="text-caption text-grey-4 q-mr-md" style="width: 20px;">{{ n }}</div>
                           <q-linear-progress 
                             :value="getRatingPercentage(n) / 100" 
                             color="amber-6" 
                             track-color="blue-grey-10" 
                             class="grow rounded-borders" 
                             style="height: 6px;"
                           />
                           <div class="text-caption text-grey-5 q-ml-md" style="width: 35px;">{{ getRatingPercentage(n) }}%</div>
                         </div>
                       </div>
                    </div>
                    <div class="text-center">
                      <div class="text-subtitle2 text-grey-4 text-uppercase letter-spacing-lg">Our Community Rating</div>
                    </div>
                  </div>
                  <div v-else class="text-center q-py-xl column flex-center">
                    <q-icon name="stars" size="4em" color="grey-9" class="q-mb-md" />
                    <div class="text-h5 text-grey-7 text-uppercase letter-spacing-md">No Ratings Yet</div>
                    <p class="text-grey-8 q-mt-sm">Be the first to share your experience!</p>
                  </div>
                </div>

                <!-- Immediate Action Section -->
                <div class="col-12 col-md-6 text-center">
                  <div class="text-grey-3 text-h5 text-weight-bold text-uppercase letter-spacing-lg q-mb-lg">Rate Your Experience</div>
                  <div class="flex justify-center">
                    <div class="glass-card-mini q-pa-md row items-center no-wrap shadow-24" style="border-radius: 60px; background: rgba(0,0,0,0.4);">
                      <q-rating
                        v-model="quickRating"
                        size="3.5em"
                        color="grey-6"
                        icon="star_border"
                        icon-selected="star"
                        flat
                        class="q-px-md animate-pop"
                      />
                      <q-btn 
                        unelevated 
                        round
                        color="grey-9" 
                        text-color="grey-4"
                        icon="send"
                        size="lg"
                        class="submit-rating-btn shadow-10"
                        @click="handleRatingSubmit"
                        style="border: 1px solid rgba(255,255,255,0.1);"
                      />
                    </div>
                  </div>
                  <div v-if="quickRating > 0" class="text-grey-4 q-mt-md text-weight-bold animate-fade-in text-h6">
                    You are giving us {{ quickRating }} stars!
                  </div>
                  <p class="text-grey-5 q-mt-md text-caption text-uppercase letter-spacing-md">Help us grow our premium community</p>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Infinite Scrolling Marquee for Happy Moments -->
        <div class="marquee-wrapper q-mt-xl" v-if="happyMoments.length > 0">
          <div class="marquee-content shadow-24">
            <!-- Double the content for seamless loop -->
            <div v-for="i in 2" :key="i" class="marquee-group">
              <div v-for="moment in happyMoments" :key="moment.id + '-' + i" class="review-premium-card">
                <!-- Gallery Image Focus -->
                <div class="moment-image-container">
                  <q-img :src="moment.image_url" :ratio="1" class="moment-img" />
                  <div class="moment-overlay" />
                </div>

                <div class="row items-start no-wrap q-pa-md relative-position">
                  <div class="q-ml-sm flex-grow-1">
                    <div class="text-subtitle1 text-weight-bolder text-white text-uppercase letter-spacing-sm truncate-1">
                      {{ moment.caption || 'Happy Moment' }}
                    </div>
                    <div class="text-caption text-grey-5 row items-center no-wrap">
                      <q-icon name="photo_camera" class="q-mr-xs" size="14px" /> Project Capture
                    </div>
                    
                    <div class="row q-mt-md no-wrap q-gutter-x-sm">
                      <div class="badge-mini gold">
                        <q-icon name="frame_inspect" size="12px" color="amber-3" />
                        <span>Type</span>
                        <div class="badge-val">{{ moment.frame_type || 'Custom' }}</div>
                      </div>
                      <div class="badge-mini blue">
                        <q-icon name="photo_size_select_large" size="12px" color="blue-3" />
                        <span>Size</span>
                        <div class="badge-val">{{ moment.frame_size || 'Standard' }}</div>
                      </div>
                    </div>

                    <div class="rating-box-premium q-mt-md">
                      <div class="text-caption text-grey-5 text-uppercase letter-spacing-sm">Client Satisfaction</div>
                      <div class="text-h4 text-weight-bolder text-blue-6">100.000 %</div>
                    </div>

                    <div class="text-caption text-grey-6 text-right q-mt-sm row items-center justify-end">
                      <q-icon name="history" size="12px" class="q-mr-xs" />
                      {{ new Date(moment.created_at).toLocaleDateString() }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="column flex-center q-pa-xl">
           <div class="glass-card-mini q-pa-xl text-center">
             <q-icon name="auto_awesome" size="48px" color="grey-8" />
             <div class="text-grey-6 q-mt-md">Upload your happy moments from the dashboard.</div>
           </div>
        </div>

    </section>

    <!-- Feedback Submission Dialog -->
    <q-dialog v-model="showReviewDialog" persistent backdrop-filter="blur(10px)">
      <q-card class="glass-dialog-solid shadow-24" style="min-width: 350px; border-radius: 24px; border: 1px solid rgba(212, 175, 55, 0.3);">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-amber-gold text-uppercase letter-spacing-lg text-weight-bold">Rate Us</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup color="grey-7" />
        </q-card-section>

        <q-card-section class="q-gutter-y-lg q-pt-xl text-center">
          <div class="rating-interactive-container">
            <div class="text-grey-4 text-subtitle1 q-mb-md">How was your experience?</div>
            <q-rating
              v-model="newReview.rating"
              size="4em"
              color="amber-6"
              icon="star_border"
              icon-selected="star"
              class="animate-pop rating-stars"
            />
            <div class="text-amber-5 text-h4 q-mt-md text-weight-bolder">{{ newReview.rating }}/5</div>
          </div>

          <q-input 
            v-model="newReview.customer_name" 
            label="Your Name" 
            outlined dark color="amber-6" 
            class="input-premium" 
            prefix-icon="person"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="amber-6" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="center" class="q-pb-xl q-px-xl">
          <q-btn 
            unelevated
            class="btn-gold-submit full-width q-py-md text-weight-bolder text-uppercase letter-spacing-md" 
            label="Submit Rating" 
            icon="check_circle" 
            @click="submitReview"
            :loading="submittingReview"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Contact Section -->
    <section id="contact" class="q-py-xl bg-black relative-position overflow-hidden section-fade-top">
      <!-- Decorative background blur - Muted Grey -->
      <div class="absolute-right full-height width-1_2 opacity-5 blur-100" style="background: #333;"></div>

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
                <q-icon name="location_on" color="grey-6" size="sm" class="q-mr-md" />
                <div>
                  <div class="text-subtitle1 text-weight-bold">Our Studio</div>
                  <div class="text-caption text-grey-5">123, High Level Road, Colombo, Sri Lanka</div>
                </div>
              </div>

              <div class="row items-center">
                <q-icon name="phone" color="grey-6" size="sm" class="q-mr-md" />
                <div>
                  <div class="text-subtitle1 text-weight-bold">Call Us</div>
                  <div class="text-caption text-grey-5">+94 77 123 4567</div>
                </div>
              </div>

              <div class="row items-center">
                <q-icon name="mail" color="grey-6" size="sm" class="q-mr-md" />
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
                  class="full-width bg-grey-10 text-white text-weight-bold q-py-sm shadow-10"
                  style="border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;"
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
      <div class="absolute-top full-width" style="height: 1px; background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);"></div>
      
      <div class="q-container container q-py-xl">
        <div class="row items-center">
          
          <!-- Empty Spacer for Balancing (Desktop only) -->
          <div class="gt-sm col-md-3"></div>

          <!-- Brand & Copyright (Center) -->
          <div class="col-12 col-md-6 text-center">
            <div class="text-h6 text-weight-bold letter-spacing-lg text-uppercase logo-chrome-text">Mr. Photo</div>
            <p class="text-grey-6 text-caption q-mt-xs q-mb-none font-roboto leading-loose">
              &copy; {{ new Date().getFullYear() }} <span class="text-white text-weight-medium">Mr. Photo Studio</span>. 
              All Rights Reserved.
            </p>
          </div>

          <!-- Social Links (Right) -->
          <div class="col-12 col-md-3 text-center text-md-right q-mt-lg q-mt-md-none">
            <div class="q-gutter-x-sm">
              <q-btn flat round color="grey-5" icon="mdi-facebook" class="footer-icon-btn-refined" />
              <q-btn flat round color="grey-5" icon="mdi-instagram" class="footer-icon-btn-refined" />
              <q-btn flat round color="grey-5" icon="mdi-whatsapp" class="footer-icon-btn-refined" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const router = useRouter()
const $q = useQuasar()
// Force Dark Mode
$q.dark.set(true)

const services = ref([])
const expandedServiceId = ref(null)
const publicReviews = ref([])
const happyMoments = ref([])
const businessStats = ref({
  stat1: { label: 'Daily Projects', value: '100+', icon: 'collections' },
  stat2: { label: 'Experience', value: '10y', icon: 'history_edu' },
  stat3: { label: 'Satisfaction', value: '100%', icon: 'workspace_premium' }
})

const showReviewDialog = ref(false)
const submittingReview = ref(false)
const user = ref(null)
const quickRating = ref(5)
const newReview = ref({
  customer_name: '',
  rating: 5
})

async function checkUser() {
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  user.value = currentUser
  if (currentUser) {
    // Try to get profile name
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', currentUser.id)
      .maybeSingle()
    
    if (profile?.full_name) {
      newReview.value.customer_name = profile.full_name
    } else if (currentUser.user_metadata?.full_name) {
      newReview.value.customer_name = currentUser.user_metadata.full_name
    }
  }
}

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
      .limit(10)
    if (data) publicReviews.value = data
  } catch (err) {
    console.error('Error fetching reviews:', err)
  }
}

async function fetchHappyMoments() {
  try {
    const { data } = await supabase
      .from('rating_photos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(15)
    
    if (data && data.length > 0) {
      // Shuffle and pick 5 random images
      const shuffled = [...data].sort(() => 0.5 - Math.random())
      happyMoments.value = shuffled.slice(0, 5)
    }
  } catch (err) {
    console.error('Error fetching happy moments:', err)
  }
}


async function handleRatingSubmit() {
  await checkUser()
  if (!user.value) {
    $q.notify({
      type: 'warning',
      message: 'Please login to submit your rating',
      icon: 'login',
      position: 'top',
      actions: [
        { label: 'Login', color: 'white', handler: () => { router.push('/admin/auth/login') } }
      ]
    })
    return
  }
  newReview.value.rating = quickRating.value
  showReviewDialog.value = true
}


const averageRating = computed(() => {
  if (!publicReviews.value.length) return '0.0'
  const total = publicReviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (total / publicReviews.value.length).toFixed(1)
})

const averageRatingNumber = computed(() => parseFloat(averageRating.value))

function getRatingPercentage(star) {
  if (!publicReviews.value.length) return 0
  const count = publicReviews.value.filter(r => r.rating === star).length
  return Math.round((count / publicReviews.value.length) * 100)
}
async function submitReview() {
  if (!newReview.value.customer_name) {
    $q.notify({ type: 'warning', message: 'Please fill in your name' })
    return
  }
  
  submittingReview.value = true
  try {
    const { error } = await supabase
      .from('feedbacks')
      .insert([{
        customer_name: newReview.value.customer_name,
        rating: newReview.value.rating,
        status: 'approved' // Auto approve for now or set to pending
      }])
    
    if (error) throw error
    
    $q.notify({
      type: 'positive',
      message: 'Thank you for your rating!',
      icon: 'stars'
    })
    
    showReviewDialog.value = false
    newReview.value = { customer_name: user.value?.user_metadata?.full_name || '', rating: 5 }
    fetchPublicReviews()
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to submit feedback' })
  } finally {
    submittingReview.value = false
  }
}

// Intersection Observer for Reveal Animations
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.reveal-item').forEach(el => {
    observer.observe(el)
  })
}

onMounted(() => {
  fetchServices()
  fetchStats()
  fetchPublicReviews()
  fetchHappyMoments()
  checkUser()
  
  // Wait a bit for components to render then init observer
  setTimeout(initScrollReveal, 500)
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
  filter: grayscale(100%) brightness(0.4) contrast(110%);
}

.section-fade {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.8) 40%, transparent 100%);
    z-index: 2;
  }
}

.section-fade-y {
  position: relative;
  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 300px;
    z-index: 2;
  }
  &::before {
    top: 0;
    background: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.8) 40%, transparent 100%);
  }
  &::after {
    bottom: 0;
    background: linear-gradient(to top, #000 0%, rgba(0,0,0,0.8) 40%, transparent 100%);
  }
}

.section-fade-top {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.9) 30%, transparent 100%);
    z-index: 2;
  }
}

.logo-chrome-text {
  background: linear-gradient(135deg, #fff 0%, #D4AF37 50%, #fff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.4));
}

.section-fade, .section-fade-y, .section-fade-top {
  &::before, &::after {
    pointer-events: none;
  }
}

/* Base Reveal Animation Style */
.reveal-item {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.reveal-active {
  opacity: 1;
  transform: translateY(0);
}

/* Premium Gold Shadow Separators */
.gold-separator-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(to bottom, rgba(212, 175, 55, 0.03) 0%, transparent 100%);
  z-index: 10;
  pointer-events: none;
}

.gold-separator-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(to top, rgba(212, 175, 55, 0.03) 0%, transparent 100%);
  z-index: 10;
  pointer-events: none;
}

.logo-colored-text {
  background: linear-gradient(45deg, #fff, #ddd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
}

.footer-icon-btn-refined {
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    color: white !important;
    transform: translateY(-3px);
  }
}

.text-amber-gold {
  color: #D4AF37 !important; /* Premium Gold */
}

.text-amber {
  color: #D4AF37 !important;
}

.bg-amber-8 {
  background-color: #D4AF37 !important;
}

.bg-amber-9 {
  background-color: #B8860B !important;
}

.glass-card-solid {
  background: rgba(15, 15, 15, 0.6);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 40px;
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
  background: rgba(212, 175, 55, 0.1); /* Golden liquid tint */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(212, 175, 55, 0.5); /* Gold border */
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(212, 175, 55, 0.15); /* Inner gold glow for liquid feel */
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
  filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.3));
  transition: transform 0.3s ease, filter 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 35px rgba(212, 175, 55, 0.5));
  }
}

.logo-colored-text {
  background: linear-gradient(135deg, #D4AF37 0%, #FFFFFF 50%, #00BCD4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; /* Standard property for compatibility */
  text-shadow: 0 5px 15px rgba(0,0,0,0.3); /* Subtle shadow to lift it */
  position: relative;
  z-index: 10;
}

.cursor-glow {
  position: fixed;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 40%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
  border-radius: 50%;
  mix-blend-mode: screen;
  filter: blur(80px); /* Increased blur for softer feel */
  transition: opacity 0.3s ease;
  box-shadow: inset 0 0 100px rgba(212, 175, 55, 0.1);
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
      text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
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
  background: radial-gradient(circle at center, #D4AF37, transparent);
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
    border-color: rgba(212, 175, 55, 0.4);
    background: rgba(40, 40, 40, 0.5); /* Lighter on hover */
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);

    .service-title {
      color: #D4AF37;
    }
    
    .img-container {
      border-color: rgba(212, 175, 55, 0.2);
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
    background: rgba(212, 175, 55, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2);
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
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 50px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: #D4AF37;
    transform: scale(1.05);
  }
}

.hover-lift {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.2) !important;
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

.glass-dialog-solid {
  background: rgba(10, 10, 10, 0.95) !important;
  backdrop-filter: blur(30px);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 175, 55, 0.1);
}

.btn-gold-submit {
  background: linear-gradient(135deg, #D4AF37 0%, #FFB300 100%);
  color: black;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);
  }
}

.rating-stars {
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
}

.input-premium {
  :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.03) !important;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  
  &.q-field--focused :deep(.q-field__control) {
    border-color: #D4AF37;
    background: rgba(212, 175, 55, 0.05) !important;
  }
}

.glass-card-mini {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.submit-rating-btn {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 5px 20px rgba(212, 175, 55, 0.6);
  }
}

.line-height-1 {
  line-height: 1;
}

.border-right-glass-desktop {
  @media (min-width: 1024px) {
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.glass-card-solid {
  background: rgba(15, 15, 15, 0.8) !important;
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 40px;
}

// Infinite Marquee Styles
.marquee-wrapper {
  width: 100%;
  overflow: hidden;
  padding: 80px 0; /* More space for fade */
  position: relative;
  background: black;
  
  /* Mask image for soft edges (Top/Bottom and Left/Right) */
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent),
              linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  mask-composite: intersect;
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent),
                      linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-composite: source-in;
}

.marquee-content {
  display: flex;
  width: max-content;
}

.marquee-group {
  display: flex;
  gap: 30px; // Space between cards
  padding-right: 30px; // Prevent overlap after loop
  animation: scroll-marquee 40s linear infinite;
}

.marquee-wrapper:hover .marquee-group {
  animation-play-state: paused;
}

@keyframes scroll-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.review-premium-card {
  width: 380px;
  flex-shrink: 0;
  margin: 0;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px; // Unified rounded corners
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  position: relative;
  z-index: 1;
  overflow: hidden; // Ensures top corners of image are clipped
  
  // Liquid Glass Shine Effect
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.08) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-15px) scale(1.02);
    z-index: 10;
    border-color: rgba(212, 175, 55, 0.4);
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 
                0 0 20px rgba(212, 175, 55, 0.1);
    
    &::before {
      opacity: 1;
      animation: shine-follow 3s infinite linear;
    }

    .moment-img {
      transform: scale(1.1);
    }
  }
}

.badge-mini {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  span {
    margin: 0 6px;
    opacity: 0.8;
  }
  
  &.gold {
    background: rgba(212, 175, 55, 0.1);
    color: #D4AF37;
    border: 0.5px solid rgba(212, 175, 55, 0.2);
  }
  &.blue {
    background: rgba(33, 150, 243, 0.1);
    color: #2196F3;
    border: 0.5px solid rgba(33, 150, 243, 0.2);
  }
  
  .badge-val {
    background: white;
    color: black;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 11px;
  }
}

.rating-box-premium {
  background: rgba(33, 150, 243, 0.05);
  border: 1px solid rgba(33, 150, 243, 0.1);
  border-radius: 16px;
  padding: 12px 20px;
  text-align: center;
}

.truncate-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes shine-follow {
  0% { transform: translate(-20%, -20%); }
  50% { transform: translate(10%, 10%); }
  100% { transform: translate(-20%, -20%); }
}

.moment-image-container {
  width: 100%;
  height: 250px;
  overflow: hidden; // Critical for top rounded corners
  position: relative;
  
  .moment-img {
    transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.moment-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 60%, rgba(10, 10, 10, 0.8));
}

.review-premium-card:hover .moment-img {
  transform: scale(1.1);
}
</style>
