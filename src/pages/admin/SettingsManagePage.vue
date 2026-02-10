<template>
  <q-page class="q-pa-md admin-page" style="padding-bottom: 120px">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-white text-weight-bold">System Settings</div>
        <div class="text-subtitle2 text-grey-5">Configure platform globals and business rules</div>
      </div>
      <q-space />
    </div>

    <!-- Floating Unique Save Action -->
    <div class="fixed-save-bar row items-center q-gutter-x-md">
      <div class="text-caption text-grey-5 gt-xs">All changes will be updated globally</div>
      <q-btn 
        class="btn-premium-save" 
        icon="auto_awesome" 
        label="Update Platform" 
        @click="saveAllSettings" 
        :loading="saving"
      />
    </div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner-dots color="amber-6" size="40px" />
    </div>

    <div v-else class="row q-col-gutter-lg">
      <!-- General Settings -->
      <div class="col-12 col-md-6">
        <q-card class="glass-card q-pa-lg">
          <div class="text-h6 text-white q-mb-md row items-center">
            <q-icon name="business" color="amber-6" class="q-mr-sm" />
            General Information
          </div>
          <div class="q-gutter-y-md">
            <q-input 
              v-model="settings.general.site_name" 
              label="Site Name" 
              outlined dark color="amber-6" 
              class="input-glass" 
            />
            <q-input 
              v-model="settings.general.contact_email" 
              label="Contact Email" 
              outlined dark color="amber-6" 
              class="input-glass" 
            />
            <q-input 
              v-model="settings.general.phone" 
              label="Business Phone" 
              outlined dark color="amber-6" 
              class="input-glass" 
            />
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-4">
                <q-input 
                  v-model="settings.general.since_year" 
                  label="Since Year" 
                  placeholder="SINCE 2014"
                  outlined dark color="amber-6" 
                  class="input-glass" 
                />
              </div>
              <div class="col-12 col-sm-8">
                <q-input 
                  v-model="settings.general.footer_tagline" 
                  label="Drawer Tagline" 
                  placeholder="PREMIUM PHOTO EXPERIENCE"
                  outlined dark color="amber-6" 
                  class="input-glass" 
                />
              </div>
            </div>
             <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-input 
                  v-model="settings.general.footer_copyright" 
                  label="Copyright Holder" 
                  placeholder="Mr. Photo Studio"
                  outlined dark color="amber-6" 
                  class="input-glass" 
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input 
                  v-model="settings.general.footer_developer" 
                  label="Developer Name" 
                  placeholder="Suraj Dev"
                  outlined dark color="amber-6" 
                  class="input-glass" 
                />
              </div>
            </div>
             <div class="row q-col-gutter-sm">
              <div class="col-12">
                <q-input 
                  v-model="settings.general.footer_developer_link" 
                  label="Developer Website / Profile Link" 
                  placeholder="https://surajdev.com"
                  outlined dark color="amber-6" 
                  class="input-glass" 
                />
              </div>
            </div>
          </div>
        </q-card>
      </div>

      <!-- Delivery Settings -->
      <div class="col-12 col-md-6">
        <q-card class="glass-card q-pa-lg">
          <div class="text-h6 text-white q-mb-md row items-center">
            <q-icon name="local_shipping" color="amber-6" class="q-mr-sm" />
            Delivery Rules
          </div>
          <div class="q-gutter-y-md">
            <q-input 
              v-model.number="settings.delivery.base_price" 
              label="Base Delivery Price (LKR)" 
              type="number"
              outlined dark color="amber-6" 
              class="input-glass" 
            />
            <q-input 
              v-model="settings.delivery.notice" 
              label="Delivery Notice / Policy" 
              type="textarea"
              outlined dark color="amber-6" 
              class="input-glass" 
              placeholder="e.g. Additional charges may apply..."
            />
          </div>
        </q-card>
      </div>

      <!-- Maintenance Mode -->
      <div class="col-12 col-md-6">
        <q-card class="glass-card q-pa-lg" :class="{ 'border-red-5': settings.maintenance.enabled }">
          <div class="text-h6 text-white q-mb-md row items-center">
            <q-icon name="build" :color="settings.maintenance.enabled ? 'red-5' : 'amber-6'" class="q-mr-sm" />
            Maintenance Mode
            <q-space />
            <q-toggle 
              v-model="settings.maintenance.enabled" 
              color="red-5" 
              keep-color
              class="text-weight-bold"
              :label="settings.maintenance.enabled ? 'ACTIVE' : 'INACTIVE'"
            />
          </div>
          <p class="text-grey-5 text-caption q-mb-md">
            When active, customers will be prevented from placing new orders. Use this for system updates or temporary closures.
          </p>
          <q-input 
            v-if="settings.maintenance.enabled"
            v-model="settings.maintenance.message" 
            label="Maintenance Message" 
            type="textarea"
            outlined dark color="red-5" 
            class="input-glass" 
            placeholder="e.g. We are currently updating our systems..."
          />
        </q-card>
      </div>

      <!-- Social Links -->
      <div class="col-12 col-md-6">
        <q-card class="glass-card q-pa-lg h-100">
           <div class="text-h6 text-white q-mb-md row items-center">
            <q-icon name="share" color="amber-6" class="q-mr-sm" />
            Social Media Links
          </div>
          <div class="q-gutter-y-md">
            <q-input 
              v-model="settings.social.facebook" 
              label="Facebook URL" 
              outlined dark color="amber-6" 
              class="input-glass" 
              placeholder="https://facebook.com/your-page"
            >
              <template v-slot:append>
                <q-btn flat round dense icon="mdi-facebook" color="blue-6" type="a" :href="settings.social.facebook" target="_blank" :disable="!settings.social.facebook" />
              </template>
            </q-input>
            <q-input 
              v-model="settings.social.instagram" 
              label="Instagram URL" 
              outlined dark color="amber-6" 
              class="input-glass"
              placeholder="https://instagram.com/your-profile"
            >
              <template v-slot:append>
                <q-btn flat round dense icon="mdi-instagram" color="pink-6" type="a" :href="settings.social.instagram" target="_blank" :disable="!settings.social.instagram" />
              </template>
            </q-input>
            <q-input 
              v-model="settings.social.whatsapp" 
              label="WhatsApp Number/Link" 
              outlined dark color="amber-6" 
              class="input-glass"
              placeholder="e.g. 94771234567"
            >
              <template v-slot:append>
                <q-btn flat round dense icon="mdi-whatsapp" color="green-5" type="a" :href="'https://wa.me/' + settings.social.whatsapp" target="_blank" :disable="!settings.social.whatsapp" />
              </template>
            </q-input>
            <q-input 
              v-model="settings.social.tiktok" 
              label="TikTok URL" 
              outlined dark color="amber-6" 
              class="input-glass"
              placeholder="https://tiktok.com/@your-profile"
            >
               <template v-slot:append>
                 <q-btn flat round dense icon="mdi-music-note" color="white" type="a" :href="settings.social.tiktok" target="_blank" :disable="!settings.social.tiktok" />
               </template>
            </q-input>
            
            <q-separator class="q-my-md bg-grey-8" />
            
            <div class="text-subtitle2 text-grey-4 q-mb-sm">Service Inquiry Contact</div>
            <q-input 
              v-model="settings.social.inquiry_number" 
              label="Service Inquiry Direct Link" 
              outlined dark color="green-5" 
              class="input-glass"
              placeholder="e.g. https://wa.me/94760000000"
              hint="Enter a full link here. The 'More Information' button will open this link directly."
            >
               <template v-slot:append>
                 <q-icon name="link" color="green-5" />
               </template>
            </q-input>
          </div>
        </q-card>
      </div>

      <!-- Business Performance Stats -->
      <div class="col-12 col-md-12">
        <q-card class="glass-card q-pa-lg">
          <div class="text-h6 text-white q-mb-md row items-center">
            <q-icon name="insights" color="amber-6" class="q-mr-sm" />
            Business Performance Highlights
          </div>
          <p class="text-grey-5 text-caption q-mb-lg">These stats are displayed on the homepage to showcase your studio's track record.</p>
          
          <div class="row q-col-gutter-lg">
            <div v-for="(stat, key) in settings.business_stats" :key="key" class="col-12 col-md-4">
              <div class="bg-grey-10 q-pa-md rounded-borders border-glass">
                <div class="text-caption text-grey-5 text-uppercase q-mb-sm">{{ stat.label }}</div>
                <q-input 
                  v-model="stat.value" 
                  :label="`Display Value (e.g. ${key === 'stat1' ? '100+' : key === 'stat2' ? '10y' : '100%'})`" 
                  outlined dark color="amber-6" 
                  class="input-glass" 
                />
              </div>
            </div>
          </div>
        </q-card>
      </div>

      <!-- Theme & Appearance -->
      <div class="col-12">
        <q-card class="glass-card q-pa-lg">
          <div class="text-h6 text-white q-mb-md row items-center">
            <q-icon name="palette" color="amber-6" class="q-mr-sm" />
            Appearance
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-select
                v-model="settings.appearance.theme"
                :options="['dark', 'light']"
                label="System Theme"
                outlined dark color="amber-6"
                class="input-glass"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="settings.appearance.primary_color"
                label="Primary Brand Color"
                outlined dark color="amber-6"
                class="input-glass"
              >
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color v-model="settings.appearance.primary_color" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
const loading = ref(true)
const saving = ref(false)

const settings = ref({
  general: { site_name: '', contact_email: '', phone: '', since_year: 'SINCE 2014', footer_tagline: 'PREMIUM PHOTO EXPERIENCE', footer_copyright: 'Mr. Photo Studio', footer_developer: 'Suraj Dev', footer_developer_link: '' },
  delivery: { base_price: 0, notice: '' },
  appearance: { theme: 'dark', primary_color: '#FFC107' },
  maintenance: { enabled: false, message: '' },
  business_stats: {
    stat1: { label: 'Daily Projects', value: '100+', icon: 'collections' },
    stat2: { label: 'Experience', value: '10y', icon: 'history_edu' },
    stat3: { label: 'Satisfaction', value: '100%', icon: 'workspace_premium' }
  },
  social: { facebook: '', instagram: '', whatsapp: '', tiktok: '', inquiry_number: '' }
})

const settingsMap = {
  general: null,
  delivery: null,
  appearance: null,
  maintenance: null,
  business_stats: null,
  social: null
}

async function fetchSettings() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
    
    if (error) throw error
    
    data.forEach(item => {
      if (settings.value[item.key]) {
        settings.value[item.key] = item.value
        settingsMap[item.key] = item.id
      }
    })
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to load settings' })
  } finally {
    loading.value = false
  }
}

async function saveAllSettings() {
  saving.value = true
  try {
    const promises = Object.keys(settings.value).map(key => {
      return supabase
        .from('site_settings')
        .update({ 
          value: settings.value[key],
          updated_at: new Date().toISOString()
        })
        .eq('key', key)
    })
    
    const results = await Promise.all(promises)
    const errors = results.filter(r => r.error)
    
    if (errors.length > 0) throw new Error('Some settings failed to save')
    
    $q.notify({ type: 'positive', message: 'All settings updated successfully!' })
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: err.message || 'Error saving settings' })
  } finally {
    saving.value = false
  }
}

onMounted(fetchSettings)
</script>

<style lang="scss" scoped>
.glass-card {
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
.input-glass :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
}
</style>
