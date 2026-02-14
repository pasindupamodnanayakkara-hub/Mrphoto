<template>
  <q-page class="bg-black text-white font-roboto">
    
    <!-- Hero Section -->
    <div class="hero-section relative-position flex flex-center overflow-hidden">
      <q-img
        src="~assets/hero_studio.webp"
        class="absolute-full hero-bg"
        fit="cover"
        style="opacity: 0.6"
      >
        <template v-slot:loading>
          <div class="text-white">Loading...</div>
        </template>
      </q-img>
      
      <div class="hero-content column flex-center relative-position q-pa-md text-center q-mt-xl q-pt-xl" data-aos="fade-up" style="zoom: 0.85;">
        <!-- Sample Logo Placeholder -->
        <q-img
          src="/services/logo.webp"
          width="120px"
          class="q-mb-md logo-pop mobile-logo-hero"
        />

        <h1 class="text-h3 text-weight-bolder q-mb-sm text-uppercase letter-spacing-lg glass-title q-px-lg q-py-sm logo-colored-text logo-pop hero-title-mobile">
          Mr. Photo
        </h1>
        
        <div class="separator q-mx-auto q-mb-md"></div>
        <div class="q-mb-lg mobile-hide-tablet">
          <p class="text-h6 text-weight-300 text-uppercase text-white glass-subtitle q-px-lg q-py-sm inline-block q-ma-none subtitle-mobile">
            Design &middot; Printing &middot; Laminating &middot; Framing
          </p>
        </div>

        <div class="q-mb-lg text-center q-px-md" style="max-width: 700px">
          <h2 class="text-h5 text-weight-light q-mb-md text-white hero-h2-mobile">Preserving Moments, Elevating Art</h2>
          <p class="text-body1 text-white text-weight-300 leading-relaxed hero-p-mobile">
            At Mr. Photo, we specialize in transforming your cherished memories into masterpieces. 
          </p>
        </div>

      </div>
      
      <div class="absolute-bottom text-center q-mb-md q-pb-md relative-position" style="zoom: 0.85;">
        <q-btn
          rounded
          unelevated
          color="white"
          text-color="black"
          label="Explore Services"
          icon-right="arrow_forward"
          class="q-px-lg q-py-md text-weight-bolder btn-luxury"
          @click="scrollToServices"
        />
      </div>
    
    <!-- Gold Shadow Transition -->
    <div class="gold-separator-top mobile-hide" style="top: 100vh;"></div>

    </div>

    <!-- Services Section -->
    <section id="services" class="q-py-xl bg-black relative-position reveal-item section-padding-mobile">
      <!-- Muted Dark Ambient Glow -->
      <div class="absolute-center bg-grey-10 opacity-10 blur-150" style="width: 100%; height: 100%; pointer-events: none;"></div>

      <div class="q-container container q-mx-auto relative-position" style="position: relative; z-index: 10;">
        <h3 class="text-h4 text-weight-thin text-center q-mb-lg text-uppercase services-title-mobile">Our Services</h3>
        
        <div class="services-showcase-container">
          <div 
            v-for="(service, index) in services" 
            :key="index" 
            class="service-mobile-card-wrapper transition-all"
          >
            <!-- Glass Card -->
            <q-card class="glass-card no-shadow relative-position overflow-hidden">
              <div class="column no-wrap relative-position z-top">
                <div class="q-pa-md">
                   <div class="overflow-hidden relative-position border-radius-sm img-container">
                    <q-img 
                      :src="service.image" 
                      :ratio="16/9"
                      class="service-img"
                    />
                  </div>
                </div>

                <q-card-section class="q-px-lg q-pb-lg q-pt-sm text-center">
                  <h4 class="text-h6 text-weight-bold q-mb-sm text-uppercase text-amber-gold">{{ service.name }}</h4>
                  <p class="text-grey-4 text-body2 leading-relaxed">
                    {{ service.description }}
                  </p>
                  
                  <q-btn 
                    outline
                    no-caps 
                    class="q-mt-md text-amber-gold text-weight-bold text-caption letter-spacing-md" 
                    label="More Information" 
                    icon-right="info" 
                    @click="viewServiceDetails(service)"
                    style="border-color: rgba(212, 175, 55, 0.4);"
                  />
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
            <div class="text-h3 text-weight-bolder logo-colored-text stat-number q-mb-sm">{{ businessStats.stat1.value }}</div>
            <div class="text-subtitle1 text-uppercase text-grey-6 letter-spacing-md text-weight-medium">{{ businessStats.stat1.label }}</div>
          </div>

          <!-- Stat 2 -->
          <div class="col-12 col-sm-4 stat-item border-x-glass">
            <q-icon :name="businessStats.stat2.icon" size="3.5em" color="grey-6" class="q-mb-md stat-icon" />
            <div class="text-h3 text-weight-bolder logo-colored-text stat-number q-mb-sm">{{ businessStats.stat2.value }}</div>
            <div class="text-subtitle1 text-uppercase text-grey-6 letter-spacing-md text-weight-medium">{{ businessStats.stat2.label }}</div>
          </div>

          <!-- Stat 3 -->
          <div class="col-12 col-sm-4 stat-item">
            <q-icon :name="businessStats.stat3.icon" size="3.5em" color="grey-6" class="q-mb-md stat-icon" />
            <div class="text-h3 text-weight-bolder logo-colored-text stat-number q-mb-sm">{{ businessStats.stat3.value }}</div>
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
          <h2 class="text-h3 text-weight-thin q-ma-none text-uppercase">Client <span class="text-weight-bold text-amber-gold">Stories</span></h2>
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
                    <div class="row items-center justify-center q-mb-lg no-wrap q-gutter-x-md">
                       <div class="column flex-center">
                         <div class="text-h1 text-weight-bolder text-amber-gold line-height-1">{{ averageRating }}</div>
                         <q-rating
                           :model-value="averageRatingNumber"
                           size="20px"
                           color="amber-6"
                           readonly
                           class="no-wrap"
                         />
                         <div class="text-caption text-grey-5 q-mt-xs text-uppercase letter-spacing-md" style="font-size: 0.7rem;">{{ publicReviews.length }} Reviews</div>
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
                  <div class="text-amber-gold text-h5 text-weight-bold text-uppercase letter-spacing-lg q-mb-lg">Rate Your Experience</div>
                  <div class="flex justify-center">
                    <div class="glass-card-mini-gold q-pa-md row items-center no-wrap shadow-24" style="border-radius: 60px; max-width: 100%;">
                      <q-rating
                        v-model="quickRating"
                        :size="$q.screen.lt.sm ? '1.8em' : '2.5em'"
                        color="amber-6"
                        icon="star_border"
                        icon-selected="star"
                        flat
                        class="q-px-sm animate-pop gold-rating no-wrap"
                      />
                      <q-btn 
                        unelevated 
                        round
                        color="amber-6" 
                        text-color="black"
                        icon="send"
                        size="lg"
                        class="submit-rating-btn shadow-10"
                        @click="handleRatingSubmit"
                        style="border: 1px solid rgba(212, 175, 55, 0.5);"
                      />
                    </div>
                  </div>
                  <div v-if="quickRating > 0" class="text-white q-mt-md text-weight-bold animate-fade-in text-h6">
                    You are giving us <span class="text-amber-gold">{{ quickRating }}</span> stars!
                  </div>
                  <p class="text-grey-5 q-mt-md text-caption text-uppercase letter-spacing-md">Help us grow our <span class="text-amber-gold">premium</span> community</p>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Infinite Scrolling Marquee for Happy Moments -->
        <div 
          class="marquee-wrapper q-mt-xl" 
          v-if="happyMoments.length > 0"
          ref="marqueeContainer"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="stopDrag"
          @mouseleave="stopDrag"
          @touchstart="pauseScroll"
          @touchend="resumeScroll"
        >
          <div class="marquee-content" :class="{ 'marquee-hovered': isHovered }">
            <!-- Render enough copies to fill screen and scroll smoothly -->
            <div v-for="i in 3" :key="i" class="marquee-group">
              <div 
                v-for="moment in happyMoments" 
                :key="moment.id + '-' + i" 
                class="review-premium-card" 
                style="zoom: 0.85;"
                @mouseenter="isHovered = true"
                @mouseleave="isHovered = false"
              >
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
                        <div class="badge-val text-uppercase">{{ moment.frame_type || 'Custom' }}</div>
                      </div>
                      <div class="badge-mini blue">
                        <q-icon name="photo_size_select_large" size="12px" color="blue-3" />
                        <span>Size</span>
                        <div class="badge-val text-uppercase">{{ moment.frame_size || 'Std' }}</div>
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
              :size="$q.screen.lt.sm ? '2em' : '3em'"
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

    <!-- Service Details Dialog -->
    <q-dialog v-model="showServiceDialog" backdrop-filter="blur(15px)">
      <q-card v-if="selectedService" class="glass-dialog-solid shadow-24 overflow-hidden relative-position column no-wrap" style="width: 700px; max-width: 95vw; max-height: 85vh; border-radius: 28px; border: 1px solid rgba(212, 175, 55, 0.3);">
        <!-- Close Button Moved Here -->
        <q-btn 
          icon="close" 
          flat round dense 
          @click="showServiceDialog = false" 
          color="white" 
          class="absolute-top-right q-ma-md glass-close-btn" 
          style="z-index: 10;" 
        />

        <q-img :src="selectedService.image" :ratio="21/9" class="service-detail-img">
          <div class="absolute-full flex items-end q-pa-lg bg-smooth-fade">
            <div class="text-h4 text-weight-bolder text-uppercase letter-spacing-lg text-amber-gold">
              {{ selectedService.name }}
            </div>
          </div>
        </q-img>

        <q-card-section class="q-pa-xl bg-greyish-charcoal scroll y-scroll" style="max-height: 100%;">
          <div class="row items-center q-mb-lg">
            <q-icon name="stars" color="amber-6" size="sm" class="q-mr-sm" />
            <div class="text-subtitle1 text-amber-gold text-uppercase letter-spacing-md text-weight-bold">Service Overview</div>
          </div>
          
          <p class="text-body1 text-grey-2 leading-relaxed q-mb-xl">
            {{ selectedService.description }}
          </p>

          <div class="glass-info-box q-pa-lg">
            <div class="row items-center q-mb-md">
              <q-icon name="verified" color="amber-6" size="sm" class="q-mr-sm" />
              <div class="text-h6 text-white text-weight-bold">Premium Quality Guaranteed</div>
            </div>
            <p class="text-body1 text-grey-4 q-ma-none leading-relaxed">
              All our studio services are performed using state-of-the-art equipment and high-grade materials to ensure your memories are preserved forever.
            </p>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-pa-lg bg-greyish-charcoal">
          <q-btn 
            :href="socialLinks.inquiry_number && socialLinks.inquiry_number.startsWith('http') ? socialLinks.inquiry_number : `https://wa.me/${socialLinks.inquiry_number || socialLinks.whatsapp || '94760000000'}?text=Hi, I would like more information about the ${selectedService ? selectedService.name : 'service'}`" 
            target="_blank"
            unelevated
            class="btn-whatsapp-pulse q-px-xl q-py-md text-weight-bolder text-uppercase letter-spacing-md text-white border-radius-lg" 
            label="For More Information" 
            icon="mdi-whatsapp" 
            @click="showServiceDialog = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Contact Section -->
    <section id="contact" class="q-py-xl bg-black relative-position overflow-hidden section-fade-top">
      <!-- Decorative background blur - Muted Grey -->
      <div class="absolute-right full-height width-1_2 opacity-5 blur-100" style="background: #333;"></div>

      <div class="container relative-position q-px-md" style="z-index: 10;">
        <div class="row justify-between items-center q-col-gutter-xl" style="zoom: 0.85;">
          
          <!-- Contact Info -->
          <div class="col-12 col-md-5 text-center text-md-left" style="padding-left: 30px;">
            <h2 class="text-h4 text-weight-bolder text-uppercase q-mb-lg text-white contact-title-mobile letter-spacing-lg">Let's Create<br><span class="text-amber-gold">Together</span></h2>
            <p class="text-white text-body1 q-mb-xl leading-relaxed opacity-90" style="max-width: 450px;">
              Ready to bring your vision to life? Visit our studio or drop us a line.
              We are waiting to capture your <span class="text-amber-gold text-weight-bold">best moments</span>.
            </p>

            <div class="column q-gutter-y-xl items-start" style="padding-left: 10px;">
              <!-- Location -->
              <div class="row items-center no-wrap">
                <div class="icon-box-premium q-mr-xl">
                  <q-icon name="location_on" color="amber-6" size="sm" />
                </div>
                <div class="text-left">
                  <div class="text-subtitle1 text-weight-bolder text-white text-uppercase letter-spacing-md">Our Studio</div>
                  <div class="text-body1 text-white">123, High Level Road, Colombo, Sri Lanka</div>
                </div>
              </div>
              
              <!-- Phone -->
              <div class="row items-center no-wrap">
                <div class="icon-box-premium q-mr-xl">
                  <q-icon name="phone" color="amber-6" size="sm" />
                </div>
                <div class="text-left">
                  <div class="text-subtitle1 text-weight-bolder text-white text-uppercase letter-spacing-md">Call Us</div>
                  <div class="text-body1 text-white">+94 77 123 4567</div>
                </div>
              </div>

              <!-- Email -->
              <div class="row items-center no-wrap">
                <div class="icon-box-premium q-mr-xl">
                  <q-icon name="mail" color="amber-6" size="sm" />
                </div>
                <div class="text-left">
                  <div class="text-subtitle1 text-weight-bolder text-white text-uppercase letter-spacing-md">Email Us</div>
                  <div class="text-body1 text-white">hello@mrphoto.lk</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="col-12 col-md-6 q-mt-xl q-mt-md-none">
            <q-card class="glass-form-gold q-pa-xl shadow-24" style="border: 1px solid rgba(212, 175, 55, 0.4);">
              <div class="text-h5 text-weight-bolder q-mb-xl text-center text-md-left">
                <span class="text-white" style="opacity: 1 !important;">Send a</span> <span class="text-amber-gold">Message</span>
              </div>
              <q-form class="q-gutter-y-md">
                <q-input 
                  dark 
                  filled 
                  v-model="name" 
                  label="Your Name" 
                  class="glass-input-gold"
                  color="amber-6"
                />
                <q-input 
                  dark 
                  filled 
                  v-model="email" 
                  label="Your Email" 
                  class="glass-input-gold"
                  color="amber-6"
                />
                <q-input 
                  dark 
                  filled 
                  v-model="message" 
                  label="Your Message" 
                  type="textarea" 
                  class="glass-input-gold"
                  color="amber-6"
                  rows="4"
                />
                <q-btn 
                  unelevated 
                  label="Send Message" 
                  class="full-width btn-gold-action text-weight-bold q-py-md shadow-10 q-mt-md"
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
    <footer class="bg-black text-white relative-position overflow-hidden">
      <!-- Top Glass Border -->
      <div class="absolute-top full-width" style="height: 1px; background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);"></div>
      
      <div class="q-container container q-py-xl">
        <div class="row items-center justify-between q-col-gutter-y-lg">
          
          <!-- Brand & Logo (Left) -->
          <div class="col-12 col-md-4 text-center text-md-left row items-center justify-center justify-md-start">
            <q-avatar size="48px" class="q-mr-md logo-pop">
              <img src="/services/logo.webp" />
            </q-avatar>
            <div class="column">
              <div class="text-h6 text-weight-bold letter-spacing-lg text-uppercase logo-chrome-text">Mr. Photo</div>
              <div class="text-caption text-grey-6 text-uppercase letter-spacing-sm">Premium Studio</div>
            </div>
          </div>

          <!-- Copyright & Credits (Center) -->
          <div class="col-12 col-md-4 text-center">
            <p class="text-grey-6 text-caption q-mb-xs font-roboto leading-normal">
              &copy; {{ new Date().getFullYear() }} <span class="text-white text-weight-medium">{{ siteInfo.footer_copyright || 'Mr. Photo Studio' }}</span>. 
            </p>
            <p class="text-grey-7 text-caption q-mb-none font-roboto italic">
              Developed by 
              <a 
                :href="siteInfo.footer_developer_link || '#'" 
                target="_blank" 
                class="text-amber-gold text-weight-bold cursor-pointer hover-white transition-all scale-hover inline-block"
                style="text-decoration: none;"
                :class="{ 'disabled-link': !siteInfo.footer_developer_link }"
                v-if="siteInfo.footer_developer_link"
              >
                {{ siteInfo.footer_developer || 'Suraj Dev' }}
              </a>
              <span 
                v-else
                class="text-amber-gold text-weight-bold cursor-pointer hover-white transition-all"
              >
                {{ siteInfo.footer_developer || 'Suraj Dev' }}
              </span>
            </p>
            <!-- Live Version Info -->

          </div>

          <!-- Social Links (Right) -->
          <div class="col-12 col-md-4 text-center text-md-right">
            <div class="q-gutter-x-sm">
              <q-btn flat round color="white" icon="mdi-facebook" class="footer-icon-btn-refined" :href="socialLinks.facebook" target="_blank" :disable="!socialLinks.facebook" :style="{ opacity: socialLinks.facebook ? 1 : 0.5 }" />
              <q-btn flat round color="white" icon="mdi-instagram" class="footer-icon-btn-refined" :href="socialLinks.instagram" target="_blank" :disable="!socialLinks.instagram" :style="{ opacity: socialLinks.instagram ? 1 : 0.5 }" />
              <q-btn flat round color="white" icon="mdi-whatsapp" class="footer-icon-btn-refined" :href="'https://wa.me/' + socialLinks.whatsapp" target="_blank" :disable="!socialLinks.whatsapp" :style="{ opacity: socialLinks.whatsapp ? 1 : 0.5 }" />
              <q-btn flat round color="white" icon="mdi-music-note" class="footer-icon-btn-refined" :href="socialLinks.tiktok" target="_blank" :disable="!socialLinks.tiktok" :style="{ opacity: socialLinks.tiktok ? 1 : 0.5 }" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const router = useRouter()
const $q = useQuasar()
// Force Dark Mode
$q.dark.set(true)

const services = ref([])
const publicReviews = ref([
  { rating: 5, customer_name: 'John Doe', status: 'approved' },
  { rating: 5, customer_name: 'Sarah Smith', status: 'approved' },
  { rating: 4, customer_name: 'Mike Ross', status: 'approved' },
  { rating: 5, customer_name: 'Lisa Ray', status: 'approved' },
  { rating: 5, customer_name: 'David Kim', status: 'approved' }
])
const happyMoments = ref([
  { id: 1, image_url: 'https://cdn.quasar.dev/img/parallax2.jpg', caption: 'Wedding Bliss', frame_type: 'Wood', frame_size: 'A4', created_at: new Date().toISOString() },
  { id: 2, image_url: 'https://cdn.quasar.dev/img/parallax1.jpg', caption: 'Family Portrait', frame_type: 'Metal', frame_size: '12x18', created_at: new Date().toISOString() },
  { id: 3, image_url: 'https://cdn.quasar.dev/img/mountains.jpg', caption: 'Travel Memory', frame_type: 'Canvas', frame_size: 'Large', created_at: new Date().toISOString() },
  { id: 4, image_url: 'https://cdn.quasar.dev/img/quasar.jpg', caption: 'Graduation Day', frame_type: 'Glass', frame_size: 'A3', created_at: new Date().toISOString() }
])
const latestCommit = ref('')
const socialLinks = ref({
  facebook: '',
  instagram: '',
  whatsapp: '',
  tiktok: '',
  inquiry_number: '' // New field for service inquiries
})

const siteInfo = ref({
  since_year: 'SINCE 2014',
  footer_tagline: 'PREMIUM PHOTO EXPERIENCE',
  footer_copyright: 'Mr. Photo Studio',
  footer_developer: 'Suraj Dev',
  footer_developer_link: ''
})
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

const selectedService = ref(null)
const showServiceDialog = ref(false)

// Marquee Refs & Logic
const marqueeContainer = ref(null)
const isPaused = ref(false)
const isHovered = ref(false)
let animationFrame = null
let scrollPos = 0
const scrollSpeed = 0.5 // Adjust for smoothness

function startScroll() {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  
  const animate = () => {
    if (!marqueeContainer.value) return
    
    if (!isPaused.value) {
      scrollPos += scrollSpeed
      const container = marqueeContainer.value
      const contentWidth = container.scrollWidth / 3 // Assuming 3 duplicates
      
      if (scrollPos >= contentWidth) {
        scrollPos = scrollPos % contentWidth // Reset seamlessly preserving offset
        container.scrollLeft = scrollPos
      } else {
        container.scrollLeft = scrollPos
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
  }
  
  animate()
}

// Drag Logic
let isDragging = false
let startX = 0
let scrollLeftStart = 0

function startDrag(e) {
  isDragging = true
  isPaused.value = true
  startX = e.pageX - marqueeContainer.value.offsetLeft
  scrollLeftStart = marqueeContainer.value.scrollLeft
  marqueeContainer.value.style.cursor = 'grabbing'
}

function onDrag(e) {
  if (!isDragging) return
  e.preventDefault()
  const x = e.pageX - marqueeContainer.value.offsetLeft
  const walk = (x - startX) * 1 // Natural 1:1 scroll
  marqueeContainer.value.scrollLeft = scrollLeftStart - walk
  scrollPos = marqueeContainer.value.scrollLeft
}

function stopDrag() {
  isDragging = false
  isPaused.value = false
  if (marqueeContainer.value) {
    marqueeContainer.value.style.cursor = 'grab'
    scrollPos = marqueeContainer.value.scrollLeft
  }
}

function pauseScroll() {
  isPaused.value = true
}

function resumeScroll() {
  isPaused.value = false
  if (marqueeContainer.value) {
    scrollPos = marqueeContainer.value.scrollLeft
  }
}

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})

function viewServiceDetails(service) {
  selectedService.value = service
  showServiceDialog.value = true
}



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

async function fetchSocialLinks() {
  try {
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'social')
      .maybeSingle()
    
    if (data && data.value) {
      socialLinks.value = data.value
    }
  } catch (err) {
    console.error('Error fetching social links:', err)
  }
}

async function fetchSiteInfo() {
  try {
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'general')
      .maybeSingle()
    
    if (data && data.value) {
      siteInfo.value = {
         ...siteInfo.value,
        ...data.value,
        footer_developer_link: data.value.footer_developer_link || '' 
      }
    }
  } catch (err) {
    console.error('Error fetching site info:', err)
  }
}

async function fetchLatestCommit() {
  try {
    const response = await fetch('https://api.github.com/repos/pasindupamodnanayakkara-hub/Mrphoto/commits?per_page=1')
    const data = await response.json()
    if (data && data.length > 0) {
      latestCommit.value = data[0].commit.message
    }
  } catch (err) {
    console.error('Error fetching GitHub commit:', err)
    latestCommit.value = 'v1.0.0-live' // Fallback
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
    if (data && data.length > 0) {
      publicReviews.value = data
    } else {
      // Dummy Reviews for UI Demo
      publicReviews.value = [
        { rating: 5, customer_name: 'John Doe', status: 'approved' },
        { rating: 5, customer_name: 'Sarah Smith', status: 'approved' },
        { rating: 4, customer_name: 'Mike Ross', status: 'approved' },
        { rating: 5, customer_name: 'Lisa Ray', status: 'approved' },
        { rating: 5, customer_name: 'David Kim', status: 'approved' }
      ]
    }
  } catch (err) {
    console.error('Error fetching reviews:', err)
    // Fallback Dummy Data on Error
    publicReviews.value = [
      { rating: 5, customer_name: 'John Doe', status: 'approved' },
      { rating: 5, customer_name: 'Sarah Smith', status: 'approved' },
      { rating: 4, customer_name: 'Mike Ross', status: 'approved' },
      { rating: 5, customer_name: 'Lisa Ray', status: 'approved' },
      { rating: 5, customer_name: 'David Kim', status: 'approved' }
    ]
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
      
      nextTick(() => {
        startScroll()
      })
    } else {
      // Dummy Happy Moments for UI Demo
      happyMoments.value = [
        { id: 1, image_url: 'https://cdn.quasar.dev/img/parallax2.jpg', caption: 'Wedding Bliss', frame_type: 'Wood', frame_size: 'A4', created_at: new Date().toISOString() },
        { id: 2, image_url: 'https://cdn.quasar.dev/img/parallax1.jpg', caption: 'Family Portrait', frame_type: 'Metal', frame_size: '12x18', created_at: new Date().toISOString() },
        { id: 3, image_url: 'https://cdn.quasar.dev/img/mountains.jpg', caption: 'Travel Memory', frame_type: 'Canvas', frame_size: 'Large', created_at: new Date().toISOString() },
        { id: 4, image_url: 'https://cdn.quasar.dev/img/quasar.jpg', caption: 'Graduation Day', frame_type: 'Glass', frame_size: 'A3', created_at: new Date().toISOString() }
      ]
      nextTick(() => {
        startScroll()
      })
    }
  } catch (err) {
    console.error('Error fetching happy moments:', err)
    // Fallback Dummy Data on Error
    happyMoments.value = [
      { id: 1, image_url: 'https://cdn.quasar.dev/img/parallax2.jpg', caption: 'Wedding Bliss', frame_type: 'Wood', frame_size: 'A4', created_at: new Date().toISOString() },
      { id: 2, image_url: 'https://cdn.quasar.dev/img/parallax1.jpg', caption: 'Family Portrait', frame_type: 'Metal', frame_size: '12x18', created_at: new Date().toISOString() },
      { id: 3, image_url: 'https://cdn.quasar.dev/img/mountains.jpg', caption: 'Travel Memory', frame_type: 'Canvas', frame_size: 'Large', created_at: new Date().toISOString() },
      { id: 4, image_url: 'https://cdn.quasar.dev/img/quasar.jpg', caption: 'Graduation Day', frame_type: 'Glass', frame_size: 'A3', created_at: new Date().toISOString() }
    ]
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
  fetchSocialLinks()
  fetchSiteInfo()
  fetchLatestCommit()
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

.hover-white:hover {
  color: white !important;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.border-gold-dim {
  border: 1px solid rgba(212, 175, 55, 0.2);
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
  max-width: 1420px; /* Increased to fit 3 cards better */
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  
  @media (min-width: 1024px) {
    padding-left: 60px;
    padding-right: 60px;
  }
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

  @media (max-width: 600px) {
    padding-left: 20px !important;
    padding-right: 20px !important;
    font-size: 2rem !important; /* Slightly smaller for mobile */
    letter-spacing: 2px;
  }
}

.section-padding-mobile {
  @media (max-width: 600px) {
    padding-top: 80px !important;
    padding-bottom: 80px !important;
  }
}

.hero-title-mobile {
  @media (max-width: 600px) {
    font-size: 2.3rem !important;
    line-height: 1.1;
  }
}

.services-title-mobile {
  @media (max-width: 600px) {
    font-size: 1.8rem !important;
  }
}

.hero-logo-mobile {
  @media (max-width: 600px) {
    width: 100px !important;
  }
}

.subtitle-mobile {
  @media (max-width: 600px) {
    font-size: 0.8rem !important;
    padding: 8px 12px !important;
  }
}

.hero-h2-mobile {
  @media (max-width: 600px) {
    font-size: 1.5rem !important;
    margin-top: 10px;
  }
}

.hero-p-mobile {
  @media (max-width: 600px) {
    font-size: 0.9rem !important;
    opacity: 0.8;
  }
}

.contact-title-mobile {
  @media (max-width: 600px) {
    font-size: 2rem !important;
    line-height: 1.1;
  }
}

.no-padding-md {
  @media (min-width: 1024px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
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
  font-size: 3rem;
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
  background: rgba(20, 20, 20, 0.4); 
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.2); 
  border-radius: 24px;
  transition: all 0.4s ease;
  height: 100%; /* Ensures all cards in a row have same height */
  display: flex;
  flex-direction: column;
  min-height: 450px; /* Better than fixed height */

  @media (max-width: 600px) {
    margin-bottom: 24px;
  }

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

.services-showcase-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  width: 100%;
  
  .service-mobile-card-wrapper {
    /* Enforce 3 columns for desktop/large screens */
    width: calc(33.333% - 20px);
    min-width: 250px; /* Low enough to not trigger wrap on standard resolutions */
    display: flex;
  }
  
  @media (max-width: 950px) {
    .service-mobile-card-wrapper {
      /* Wrap to 2 columns on tablets */
      width: calc(50% - 15px);
      min-width: 300px;
    }
  }

  @media (max-width: 650px) {
    gap: 20px;
    .service-mobile-card-wrapper {
      /* Stack on mobile */
      width: 100%;
      min-width: 0;
    }
  }
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

.bg-smooth-fade {
  background: linear-gradient(to bottom, transparent 30%, rgba(10, 10, 10, 0.4) 60%, rgba(10, 10, 10, 1) 100%);
}

.bg-greyish-charcoal {
  background: rgba(22, 22, 22, 1) !important;
}

.service-detail-img {
  border-bottom: none !important;
}

.glass-close-btn {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-info-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
}

.glass-card-mini {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-card-mini-gold {
  background: rgba(10, 10, 10, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
}

.glass-form-gold {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
}

.glass-input-gold {
  :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.15) !important; /* Brighter background */
    border: 1px solid rgba(255, 255, 255, 0.3); /* Stronger border */
    color: white !important;
  }
  :deep(.q-field__native), :deep(.q-field__label) {
     color: white !important; /* Force text to be white */
  }
  &.q-field--focused :deep(.q-field__control) {
    border-color: rgba(212, 175, 55, 0.6);
    background: rgba(212, 175, 55, 0.05) !important;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
  }
}

.btn-gold-action {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  color: black;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-transform: uppercase;
  letter-spacing: 2px;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
    filter: brightness(1.1);
  }
}

.icon-box-premium {
  width: 55px;
  height: 55px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
}

.drop-shadow-gold {
  filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.5));
}

.icon-glow-gold {
  filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
}

.gold-rating {
  filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.2));
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
  overflow-x: auto; /* Allow manual scroll */
  overflow-y: hidden;
  padding: 80px 0;
  position: relative;
  background: black;
  cursor: grab;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
  
  /* Mask image for soft edges */
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  
  &:active {
    cursor: grabbing;
  }
}

.marquee-content {
  display: flex;
  width: max-content;
  align-items: center;
  /* Hover effect on wrapper to dim others */
  transition: all 0.5s ease;
  
  &.marquee-hovered .review-premium-card:not(:hover) {
    opacity: 0.3;
    filter: blur(3px) grayscale(0.8);
    transform: scale(0.95);
  }
}

.marquee-group {
  display: flex;
  gap: 30px;
  padding-right: 30px;
}

/* Removed @keyframes scroll-marquee */

.review-premium-card {
  width: 380px;
  flex-shrink: 0;
  margin: 0;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px; /* Slightly refined */
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
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
      rgba(212, 175, 55, 0.1) 0%,
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-15px) scale(1.05);
    z-index: 100; /* Pop out */
    border-color: rgba(212, 175, 55, 0.6);
    background: rgba(20, 20, 20, 0.9);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8), 
                0 0 30px rgba(212, 175, 55, 0.15);
    
    &::before {
      opacity: 1;
      animation: shine-follow 3s infinite linear;
    }

    .moment-img {
      transform: scale(1.15);
    }
  }
}

.badge-mini {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 12px; /* Matched to card radius style */
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.5px;
  
  span {
    margin: 0 6px;
    opacity: 0.8;
  }
  
  &.gold {
    background: rgba(212, 175, 55, 0.08);
    color: #D4AF37;
    border: 1px solid rgba(212, 175, 55, 0.25);
  }
  &.blue {
    background: rgba(33, 150, 243, 0.08);
    color: #2196F3;
    border: 1px solid rgba(33, 150, 243, 0.25);
  }
  
  .badge-val {
    color: white;
    margin-left: 8px;
    font-weight: normal;
    opacity: 0.9;
  }
}

.rating-box-premium {
  background: rgba(33, 150, 243, 0.05);
  border: 1px solid rgba(33, 150, 243, 0.1);
  border-radius: 16px;
  padding: 10px 20px;
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
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
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
  background: linear-gradient(to bottom, transparent 50%, rgba(10, 10, 10, 0.9));
}
</style>
