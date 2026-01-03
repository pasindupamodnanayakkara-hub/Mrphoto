<template>
  <q-page class="q-pa-md admin-page">
    <div class="row items-center q-mb-md">
      <div>
        <div class="text-h5 text-white text-weight-bold">Service Management</div>
        <div class="text-subtitle2 text-grey-5">Manage the services displayed on your home page</div>
      </div>
      <q-space />
      <q-btn color="amber-6" text-color="black" icon="add" label="Add Service" @click="openAddDialog" />
    </div>

    <!-- Services Table -->
    <q-card class="glass-table">
      <q-table
        :rows="services"
        :columns="columns"
        row-key="id"
        dark
        flat
        bordered
        :loading="loading"
        card-class="bg-transparent"
        table-header-class="text-grey-5"
      >
        <template v-slot:body-cell-image="props">
          <q-td :props="props">
            <q-img 
              v-if="props.value && !props.value.startsWith('src/')"
              :src="props.value" 
              style="width: 50px; height: 50px; border-radius: 4px;"
            >
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-grey-9 text-grey-5">
                  <q-icon name="broken_image" size="20px" />
                </div>
              </template>
            </q-img>
            <q-avatar v-else color="grey-9" text-color="grey-5" square size="50px" rounded-borders>
              <q-icon name="image" />
            </q-avatar>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn flat round dense color="amber-5" icon="edit" size="sm" @click="editService(props.row)" />
            <q-btn flat round dense color="red-5" icon="delete" size="sm" @click="confirmDelete(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Service Dialog -->
    <q-dialog v-model="showDialog" persistent>
      <q-card class="glass-dialog" style="min-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6 text-white">{{ isEditing ? 'Edit Service' : 'Add New Service' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup color="grey" />
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
          <q-input v-model="currentService.name" label="Service Name" outlined dark color="amber-6" class="input-glass" />
          <q-input v-model="currentService.description" label="Short Intro" outlined dark type="textarea" color="amber-6" class="input-glass" placeholder="Summary for the card view..." />
          <q-input v-model="currentService.detailed_description" label="Detailed Approach" outlined dark type="textarea" color="amber-6" class="input-glass" placeholder="Describe your process & techniques..." />
          
          <!-- Features List Editor -->
          <div class="column q-gutter-y-sm">
            <div class="text-caption text-grey-5 row items-center">
              <q-icon name="list" class="q-mr-xs" />
              Premium Features
              <q-space />
              <q-btn flat round dense icon="add" color="amber-6" size="sm" @click="addFeature">
                <q-tooltip>Add Feature</q-tooltip>
              </q-btn>
            </div>
            <div v-for="(feature, idx) in currentService.features" :key="idx" class="row items-center q-gutter-x-sm">
              <q-input 
                v-model="currentService.features[idx]" 
                dense outlined dark 
                color="amber-6" 
                class="input-glass col" 
                placeholder="Feature detail..."
              />
              <q-btn flat round dense icon="remove_circle_outline" color="red-5" size="sm" @click="removeFeature(idx)" />
            </div>
          </div>
          
          <!-- Image Section -->
          <div class="column q-gutter-y-sm">
            <div class="text-caption text-grey-5">Service Image</div>
            
            <div v-if="imagePreview" class="relative-position" style="width: 150px; height: 150px;">
              <q-img :src="imagePreview" style="width: 150px; height: 150px; border-radius: 8px;" />
              <q-btn fab-mini color="red" icon="close" class="absolute-top-right" size="xs" @click="clearImage" />
            </div>

            <q-file
              v-model="imageFile"
              label="Upload Image (Max 1MB)"
              outlined
              dark
              color="amber-6"
              class="input-glass"
              accept="image/*"
              @update:model-value="onImageSelected"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" color="grey-6" />
              </template>
            </q-file>
            

          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn 
            class="btn-premium-save" 
            icon="auto_awesome"
            :label="isEditing ? 'Update Service' : 'Create Service'" 
            @click="saveService" 
            :loading="saving" 
          />
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
const loading = ref(false)
const saving = ref(false)
const services = ref([])
const showDialog = ref(false)
const isEditing = ref(false)

const imageFile = ref(null)
const imagePreview = ref(null)

const currentService = ref({
  name: '',
  description: '',
  detailed_description: '',
  features: [],
  image: ''
})

function addFeature() {
  if (!currentService.value.features) currentService.value.features = []
  currentService.value.features.push('')
}

function removeFeature(index) {
  currentService.value.features.splice(index, 1)
}

const columns = [
  { name: 'image', label: 'Preview', field: 'image', align: 'left' },
  { name: 'name', required: true, label: 'Service Name', align: 'left', field: 'name', sortable: true },
  { name: 'description', align: 'left', label: 'Description', field: 'description', style: 'max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
]

onMounted(() => {
  fetchServices()
})

async function fetchServices() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true })
      
    if (error) throw error
    services.value = data
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to fetch services' })
  } finally {
    loading.value = false
  }
}

function onImageSelected(file) {
  if (file) {
    if (file.size > 1024 * 1024) {
      $q.notify({ type: 'negative', message: 'Image size must be less than 1MB' })
      imageFile.value = null
      imagePreview.value = null
      return
    }
    imagePreview.value = URL.createObjectURL(file)
  }
}

function clearImage() {
  imageFile.value = null
  imagePreview.value = null
  if (isEditing.value) currentService.value.image = ''
}

function openAddDialog() {
  isEditing.value = false
  currentService.value = { name: '', description: '', image: '' }
  imageFile.value = null
  imagePreview.value = null
  showDialog.value = true
}

function editService(service) {
  isEditing.value = true
  currentService.value = { 
    ...service,
    features: service.features || []
  }
  imageFile.value = null
  imagePreview.value = service.image
  showDialog.value = true
}

async function deleteImageFromStorage(url) {
  if (!url || !url.includes('service-images')) return
  try {
    const parts = url.split('service-images/')
    if (parts.length > 1) {
      const filePath = parts[1]
      await supabase.storage.from('service-images').remove([filePath])
    }
  } catch (err) {
    console.error('Error deleting image:', err)
  }
}

async function uploadImage() {
  if (!imageFile.value) return currentService.value.image

  const file = imageFile.value
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `services/${fileName}`

  if (isEditing.value && currentService.value.image) {
    await deleteImageFromStorage(currentService.value.image)
  }

  const { error: uploadError } = await supabase.storage
    .from('service-images')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('service-images')
    .getPublicUrl(filePath)

  return publicUrl
}

async function saveService() {
  saving.value = true
  try {
    const imageUrl = await uploadImage()
    const serviceData = {
      name: currentService.value.name,
      description: currentService.value.description,
      detailed_description: currentService.value.detailed_description,
      features: currentService.value.features || [],
      image: imageUrl
    }

    if (isEditing.value) {
      const { error } = await supabase.from('services').update(serviceData).eq('id', currentService.value.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('services').insert([serviceData])
      if (error) throw error
    }

    $q.notify({ type: 'positive', message: `Service ${isEditing.value ? 'updated' : 'added'} successfully` })
    showDialog.value = false
    fetchServices()
  } catch (error) {
    $q.notify({ type: 'negative', message: error.message || 'Error saving service' })
  } finally {
    saving.value = false
  }
}

function confirmDelete(service) {
  $q.dialog({
    title: 'Confirm',
    message: `Are you sure you want to delete "${service.name}"?`,
    dark: true,
    ok: { color: 'red', label: 'Delete' },
    cancel: true
  }).onOk(async () => {
    try {
      if (service.image) await deleteImageFromStorage(service.image)
      const { error } = await supabase.from('services').delete().eq('id', service.id)
      if (error) throw error
      $q.notify({ type: 'positive', message: 'Service deleted' })
      fetchServices()
    } catch {
      $q.notify({ type: 'negative', message: 'Failed to delete service' })
    }
  })
}
</script>

<style lang="scss" scoped>
.glass-table {
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
.glass-dialog {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.input-glass :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
}
</style>
