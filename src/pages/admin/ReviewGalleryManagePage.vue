<template>
  <q-page class="q-pa-md admin-page">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-white text-weight-bold">Happy Moments Gallery</div>
        <div class="text-subtitle2 text-grey-5">Manage photos of happy customers and successful deliveries</div>
      </div>
      <q-space />
      <q-btn color="amber-6" text-color="black" icon="add_a_photo" label="Upload Photo" @click="openDialog" />
    </div>

    <!-- Gallery Grid -->
    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner-dots color="amber-6" size="40px" />
    </div>
    
    <div v-else class="row q-col-gutter-md">
      <div v-for="photo in photos" :key="photo.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="glass-card full-height overflow-hidden">
          <q-img :src="photo.image_url" :ratio="1" />
          <q-card-section>
            <div class="text-subtitle2 text-white ellipsis">{{ photo.caption || 'No caption' }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat round color="red-5" icon="delete" size="sm" @click="confirmDelete(photo)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Upload Dialog -->
    <q-dialog v-model="showDialog" persistent>
      <q-card class="glass-dialog" style="min-width: 400px">
        <q-card-section class="row items-center">
          <div class="text-h6 text-white">Upload New Moment</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup color="grey" />
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
           <q-file
            v-model="imageFile"
            label="Select Photo"
            outlined dark color="amber-6"
            class="input-glass"
            accept="image/*"
            @update:model-value="onImageSelected"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" color="amber-6" />
            </template>
          </q-file>

          <q-input 
            v-model="caption" 
            label="Caption (Optional)" 
            outlined dark color="amber-6" 
            class="input-glass" 
            placeholder="e.g. Happy customer with our custom wood frame"
          />

          <div v-if="imagePreview" class="flex flex-center">
            <q-img :src="imagePreview" style="max-height: 200px; border-radius: 8px;" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn class="btn-premium-save" icon="save" label="Upload to Gallery" @click="uploadPhoto" :loading="saving" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
const photos = ref([])
const loading = ref(false)
const saving = ref(false)
const showDialog = ref(false)

const imageFile = ref(null)
const imagePreview = ref(null)
const caption = ref('')

onMounted(fetchPhotos)

async function fetchPhotos() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('rating_photos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    photos.value = data
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to fetch photos' })
  } finally {
    loading.value = false
  }
}

function openDialog() {
  imageFile.value = null
  imagePreview.value = null
  caption.value = ''
  showDialog.value = true
}

function onImageSelected(file) {
  if (file) {
    imagePreview.value = URL.createObjectURL(file)
  }
}

async function uploadPhoto() {
  if (!imageFile.value) return
  saving.value = true
  try {
    const file = imageFile.value
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `moments/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('service-images') // Reusing the same bucket for simplicity
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('service-images')
      .getPublicUrl(filePath)

    const { error: insertError } = await supabase
      .from('rating_photos')
      .insert([{
        image_url: publicUrl,
        caption: caption.value
      }])

    if (insertError) throw insertError

    $q.notify({ type: 'positive', message: 'Photo uploaded successfully' })
    showDialog.value = false
    fetchPhotos()
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Upload failed: ' + (err.message || '') })
  } finally {
    saving.value = false
  }
}

function confirmDelete(photo) {
  $q.dialog({
    title: 'Confirm',
    message: 'Remove this photo from the gallery?',
    dark: true,
    ok: { color: 'red', label: 'Delete' },
    cancel: true
  }).onOk(async () => {
    try {
      const { error } = await supabase.from('rating_photos').delete().eq('id', photo.id)
      if (error) throw error
      $q.notify({ type: 'positive', message: 'Photo removed' })
      fetchPhotos()
    } catch {
      $q.notify({ type: 'negative', message: 'Failed to delete' })
    }
  })
}
</script>

<style lang="scss" scoped>
.glass-dialog {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.input-glass :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
}
</style>
