<template>
  <q-page class="q-pa-md admin-page">
    <div class="row items-center q-mb-md">
      <div>
        <div class="text-h5 text-white text-weight-bold">Product Management</div>
        <div class="text-subtitle2 text-grey-5">Manage your store products, pricing and details</div>
      </div>
      <q-space />
      <q-btn color="amber-6" text-color="black" icon="add" label="Add Product" @click="openAddDialog" />
    </div>

    <!-- Products Table -->
    <q-card class="glass-table">
      <q-table
        :rows="products"
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
            <q-img :src="props.value" style="width: 50px; height: 50px; border-radius: 4px;" />
          </q-td>
        </template>

        <template v-slot:body-cell-tag="props">
          <q-td :props="props">
            <q-badge color="amber-9" text-color="black" class="text-weight-bold">
              {{ props.value }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-price="props">
          <q-td :props="props">
            LKR {{ props.value }}
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn flat round dense color="amber-5" icon="edit" size="sm" @click="editProduct(props.row)" />
            <q-btn flat round dense color="red-5" icon="delete" size="sm" @click="confirmDelete(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Product Dialog (Add/Edit) -->
    <q-dialog v-model="showDialog" persistent>
      <q-card class="glass-dialog" style="min-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6 text-white">{{ isEditing ? 'Edit Product' : 'Add New Product' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup color="grey" />
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
          <q-input v-model="currentProduct.name" label="Product Name" outlined dark color="amber-6" class="input-glass" />
          <q-input v-model="currentProduct.description" label="Description" outlined dark type="textarea" color="amber-6" class="input-glass" />
          
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-input v-model="currentProduct.price" label="Price" outlined dark color="amber-6" class="input-glass" />
            </div>
            <div class="col-6">
              <q-input v-model="currentProduct.tag" label="Tag (e.g. New, Best Seller)" outlined dark color="amber-6" class="input-glass" />
            </div>
          </div>

          <!-- Image Section -->
          <div class="column q-gutter-y-sm">
            <div class="text-caption text-grey-5">Product Image</div>
            
            <div v-if="imagePreview" class="relative-position" style="width: 150px; height: 150px;">
              <q-img :src="imagePreview" style="width: 150px; height: 150px; border-radius: 8px;" />
              <q-btn fab-mini color="red" icon="close" class="absolute-top-right" size="xs" @click="clearImage" />
            </div>

            <q-file
              v-model="imageFile"
              label="Upload Image"
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
          <q-btn unelevated :label="isEditing ? 'Save Changes' : 'Add Product'" color="amber-6" text-color="black" @click="saveProduct" :loading="saving" />
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
const products = ref([])
const showDialog = ref(false)
const isEditing = ref(false)

const imageFile = ref(null)
const imagePreview = ref(null)

const currentProduct = ref({
  name: '',
  description: '',
  price: '',
  image: '',
  tag: ''
})

const columns = [
  { name: 'image', label: 'Preview', field: 'image', align: 'left' },
  { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
  { name: 'tag', align: 'center', label: 'Tag', field: 'tag' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
]

onMounted(() => {
  fetchProducts()
})

async function fetchProducts() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    products.value = data
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to fetch products' })
  } finally {
    loading.value = false
  }
}

function onImageSelected(file) {
  if (file) {
    if (file.size > 1024 * 1024) { // 1MB Limit
      $q.notify({
        type: 'negative',
        message: 'Image size must be less than 1MB'
      })
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
  // If we were editing, we keep the old URL until save, 
  // but if the user wants to remove the image entirely:
  if (isEditing.value) {
    currentProduct.value.image = ''
  }
}

function openAddDialog() {
  isEditing.value = false
  currentProduct.value = { name: '', description: '', price: '', image: '', tag: '' }
  imageFile.value = null
  imagePreview.value = null
  showDialog.value = true
}

function editProduct(product) {
  isEditing.value = true
  currentProduct.value = { ...product }
  imageFile.value = null
  imagePreview.value = product.image
  showDialog.value = true
}

// Helper to delete an image from storage using its public URL
async function deleteImageFromStorage(url) {
  if (!url || !url.includes('product-images')) return
  
  try {
    // Extract file path from URL
    // Format: .../storage/v1/object/public/product-images/products/filename.ext
    const parts = url.split('product-images/')
    if (parts.length > 1) {
      const filePath = parts[1]
      await supabase.storage
        .from('product-images')
        .remove([filePath])
      console.log('Old image deleted from storage:', filePath)
    }
  } catch (err) {
    console.error('Error deleting old image:', err)
  }
}

async function uploadImage() {
  if (!imageFile.value) return currentProduct.value.image

  const file = imageFile.value
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `products/${fileName}`

  // If we are editing and have a new file, we should delete the old one first
  if (isEditing.value && currentProduct.value.image) {
    await deleteImageFromStorage(currentProduct.value.image)
  }

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)

  return publicUrl
}

async function saveProduct() {
  saving.value = true
  try {
    const imageUrl = await uploadImage()
    
    const productData = {
      name: currentProduct.value.name,
      description: currentProduct.value.description,
      price: currentProduct.value.price,
      image: imageUrl,
      tag: currentProduct.value.tag
    }

    if (isEditing.value) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', currentProduct.value.id)
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('products')
        .insert([productData])
      if (error) throw error
    }

    $q.notify({ type: 'positive', message: `Product ${isEditing.value ? 'updated' : 'added'} successfully` })
    showDialog.value = false
    fetchProducts()
  } catch (error) {
    $q.notify({ type: 'negative', message: error.message || 'Error saving product' })
  } finally {
    saving.value = false
  }
}

function confirmDelete(product) {
  $q.dialog({
    title: 'Confirm',
    message: `Are you sure you want to delete "${product.name}"? This will also remove the image from cloud storage.`,
    dark: true,
    ok: { color: 'red', label: 'Delete' },
    cancel: true
  }).onOk(async () => {
    try {
      // 1. Delete image from storage first
      if (product.image) {
        await deleteImageFromStorage(product.image)
      }

      // 2. Delete from database
      const { error } = await supabase.from('products').delete().eq('id', product.id)
      if (error) throw error
      
      $q.notify({ type: 'positive', message: 'Product and image deleted' })
      fetchProducts()
    } catch {
      $q.notify({ type: 'negative', message: 'Failed to delete product' })
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
