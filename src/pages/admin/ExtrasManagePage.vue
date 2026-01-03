<template>
  <q-page class="q-pa-md admin-page">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-white text-weight-bold">Product Add-ons (Extras)</div>
        <div class="text-subtitle2 text-grey-5">Manage extras like flowers, chocolates, and gift wraps</div>
      </div>
      <q-space />
      <q-btn color="amber-6" text-color="black" icon="add" label="Add Extra Item" @click="openAddDialog" />
    </div>

    <!-- Extras Table -->
    <q-card class="glass-table">
      <q-table
        :rows="extras"
        :columns="columns"
        row-key="id"
        dark
        flat
        bordered
        :loading="loading"
        card-class="bg-transparent"
        table-header-class="text-grey-5"
      >
        <template v-slot:body-cell-price="props">
          <q-td :props="props">
            <span class="text-weight-bold text-amber-6">LKR {{ props.value }}</span>
          </q-td>
        </template>

        <template v-slot:body-cell-active="props">
          <q-td :props="props" class="text-center">
            <q-toggle
              v-model="props.row.active"
              @update:model-value="toggleStatus(props.row)"
              color="green"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn flat round dense color="amber-5" icon="edit" size="sm" @click="openEditDialog(props.row)" class="q-mr-xs" />
            <q-btn flat round dense color="red-5" icon="delete" size="sm" @click="confirmDelete(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Extra Item Dialog -->
    <q-dialog v-model="showDialog" persistent>
      <q-card class="glass-dialog" style="min-width: 400px">
        <q-card-section class="row items-center">
          <div class="text-h6 text-white">{{ isEditing ? 'Edit Extra Item' : 'New Extra Item' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup color="grey" />
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
          <q-input 
            v-model="currentItem.name" 
            label="Item Name" 
            outlined dark color="amber-6" 
            class="input-glass" 
            placeholder="e.g. Flower Bouquet"
          />
          
          <q-input 
            v-model.number="currentItem.price" 
            label="Price (LKR)" 
            type="number"
            outlined dark color="amber-6" 
            class="input-glass" 
          />

          <q-input 
            v-model="currentItem.description" 
            label="Description (Optional)" 
            type="textarea"
            outlined dark color="amber-6" 
            class="input-glass" 
            rows="2"
          />

          <q-toggle v-model="currentItem.active" label="Item Active & Visible" dark color="green" />
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn 
            class="btn-premium-save" 
            icon="auto_awesome"
            label="Save Extra Item" 
            @click="saveItem" 
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
const extras = ref([])
const showDialog = ref(false)
const isEditing = ref(false)

const currentItem = ref({
  name: '',
  price: 0,
  description: '',
  active: true
})

const columns = [
  { name: 'name', label: 'Item Name', field: 'name', align: 'left', sortable: true },
  { name: 'description', label: 'Description', field: 'description', align: 'left' },
  { name: 'price', label: 'Price', field: 'price', align: 'left', sortable: true },
  { name: 'active', label: 'Status', field: 'active', align: 'center' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
]

onMounted(fetchExtras)

async function fetchExtras() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('product_extras')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    extras.value = data
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to fetch items' })
  } finally {
    loading.value = false
  }
}

function openAddDialog() {
  isEditing.value = false
  currentItem.value = { name: '', price: 0, description: '', active: true }
  showDialog.value = true
}

function openEditDialog(item) {
  isEditing.value = true
  currentItem.value = { ...item }
  showDialog.value = true
}

async function saveItem() {
  if (!currentItem.value.name) {
    $q.notify({ type: 'warning', message: 'Item name is required' })
    return
  }
  
  saving.value = true
  try {
    const itemData = { ...currentItem.value }
    const id = itemData.id
    delete itemData.id
    delete itemData.created_at

    if (isEditing.value) {
      const { error } = await supabase
        .from('product_extras')
        .update(itemData)
        .eq('id', id)
      
      if (error) throw error
      $q.notify({ type: 'positive', message: 'Item updated successfully' })
    } else {
      const { error } = await supabase
        .from('product_extras')
        .insert([itemData])
      
      if (error) throw error
      $q.notify({ type: 'positive', message: 'Item created successfully' })
    }
    
    showDialog.value = false
    fetchExtras()
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Error saving item: ' + err.message })
  } finally {
    saving.value = false
  }
}

async function toggleStatus(item) {
  try {
    const { error } = await supabase
      .from('product_extras')
      .update({ active: item.active })
      .eq('id', item.id)
    if (error) throw error
  } catch (err) {
    console.error(err)
    item.active = !item.active // Revert
  }
}

function confirmDelete(item) {
  $q.dialog({
    title: 'Confirm',
    message: `Delete "${item.name}"? This cannot be undone.`,
    dark: true,
    ok: { color: 'red', label: 'Delete' },
    cancel: true
  }).onOk(async () => {
    try {
      const { error } = await supabase
        .from('product_extras')
        .delete()
        .eq('id', item.id)

      if (error) throw error
      $q.notify({ type: 'positive', message: 'Item deleted' })
      fetchExtras()
    } catch {
      $q.notify({ type: 'negative', message: 'Delete failed' })
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
