<template>
  <q-page class="q-pa-md admin-page">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-white text-weight-bold">Promo Codes</div>
        <div class="text-subtitle2 text-grey-5">Manage discounts and rewards</div>
      </div>
      <q-space />
      <q-btn color="amber-6" text-color="black" icon="add" label="Create Promo" @click="openAddDialog" />
    </div>

    <!-- Promo Codes Table -->
    <q-card class="glass-table">
      <q-table
        :rows="promos"
        :columns="columns"
        row-key="id"
        dark
        flat
        bordered
        :loading="loading"
        card-class="bg-transparent"
        table-header-class="text-grey-5"
      >
        <template v-slot:body-cell-code="props">
          <q-td :props="props">
            <q-badge color="amber-9" text-color="black" class="text-weight-bold text-uppercase">
               {{ props.value }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-discount="props">
          <q-td :props="props">
            {{ props.row.discount_type === 'percentage' ? props.row.discount_value + '%' : 'LKR ' + props.row.discount_value }}
          </q-td>
        </template>

        <template v-slot:body-cell-usage="props">
          <q-td :props="props" class="text-center">
            <q-chip 
              dense 
              :color="props.row.usage_limit && props.row.used_count >= props.row.usage_limit ? 'red-9' : 'grey-9'"
              text-color="white"
            >
              {{ props.row.used_count }} / {{ props.row.usage_limit || '∞' }}
            </q-chip>
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

    <!-- Promo Dialog -->
    <q-dialog v-model="showDialog" persistent>
      <q-card class="glass-dialog" style="min-width: 400px">
        <q-card-section class="row items-center">
          <div class="text-h6 text-white">{{ isEditing ? 'Edit Promo' : 'New Promo Code' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup color="grey" />
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
          <q-input 
            v-model="currentPromo.code" 
            label="Promo Code" 
            outlined dark color="amber-6" 
            class="input-glass" 
            placeholder="e.g. SAVE20"
            mask="XXXXXXXXXXXX"
          />
          
          <div class="q-mb-sm">
            <div class="text-caption text-grey-5 q-mb-xs">Discount Type</div>
            <q-btn-toggle
              v-model="currentPromo.discount_type"
              no-caps
              rounded
              unelevated
              toggle-color="amber-6"
              color="grey-9"
              text-color="white"
              toggle-text-color="black"
              :options="[
                { label: 'Percentage (%)', value: 'percentage', icon: 'percent' },
                { label: 'Fixed Amount (LKR)', value: 'fixed', icon: 'attach_money' }
              ]"
            />
          </div>

          <q-input 
            v-model.number="currentPromo.discount_value" 
            :label="currentPromo.discount_type === 'percentage' ? 'Percentage (%)' : 'Amount (LKR)'"
            type="number"
            outlined dark color="amber-6" 
            class="input-glass" 
            :hint="currentPromo.discount_type === 'percentage' ? 'Percentage (e.g. 10 to 100)' : 'Fixed Amount (LKR)'"
            :rules="[
              val => val > 0 || 'Value must be positive',
              val => (currentPromo.discount_type !== 'percentage' || val <= 100) || 'Percentage cannot exceed 100%'
            ]"
            @update:model-value="validateDiscountValue"
          />

          <q-input 
            v-model.number="currentPromo.min_purchase" 
            label="Minimum Purchase (LKR)" 
            type="number"
            outlined dark color="amber-6" 
            class="input-glass" 
          />

          <q-input 
            v-model.number="currentPromo.usage_limit" 
            label="Usage Limit (Total uses)" 
            type="number"
            outlined dark color="amber-6" 
            class="input-glass" 
            hint="Maximum number of times this code can be used (Leave 0 for unlimited)"
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="loop" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn 
            label="Save" 
            color="amber-6"
            text-color="black"
            @click="savePromo" 
            :loading="saving" 
            unelevated
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
const promos = ref([])
const showDialog = ref(false)
const isEditing = ref(false)

const currentPromo = ref({
  code: '',
  discount_type: 'percentage',
  discount_value: 0,
  min_purchase: 0,
  usage_limit: 0,
  used_count: 0,
  active: true
})

const columns = [
  { name: 'code', label: 'Code', field: 'code', align: 'left', sortable: true },
  { name: 'discount', label: 'Discount', align: 'left' },
  { name: 'min_purchase', label: 'Min Purchase', field: 'min_purchase', align: 'left', format: val => `LKR ${val}` },
  { name: 'usage', label: 'Usage (Used/Limit)', align: 'center' },
  { name: 'active', label: 'Active', field: 'active', align: 'center' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
]

onMounted(fetchPromos)

async function fetchPromos() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    promos.value = data
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to fetch promos' })
  } finally {
    loading.value = false
  }
}

function openAddDialog() {
  isEditing.value = false
  currentPromo.value = { 
    code: '', 
    discount_type: 'percentage', 
    discount_value: 0, 
    min_purchase: 0, 
    usage_limit: 0,
    used_count: 0,
    active: true 
  }
  showDialog.value = true
}

function openEditDialog(promo) {
  isEditing.value = true
  currentPromo.value = { ...promo }
  showDialog.value = true
}

function validateDiscountValue(val) {
  if (currentPromo.value.discount_type === 'percentage' && val > 100) {
    currentPromo.value.discount_value = 100
  }
}

async function savePromo() {
  if (!currentPromo.value.code) {
    $q.notify({ type: 'warning', message: 'Promo code is required' })
    return
  }

  // Strict Validation
  if (currentPromo.value.discount_value <= 0) {
    $q.notify({ type: 'warning', message: 'Discount value must be positive' })
    return
  }

  if (currentPromo.value.discount_type === 'percentage' && currentPromo.value.discount_value > 100) {
    $q.notify({ type: 'warning', message: 'Percentage discount cannot exceed 100%' })
    return
  }

  saving.value = true
  try {
    const { id, ...cleanData } = currentPromo.value
    delete cleanData.created_at // Remove timestamp to avoid DB conflicts
    
    const promoData = {
      ...cleanData,
      code: currentPromo.value.code.toUpperCase(),
      usage_limit: currentPromo.value.usage_limit || null
    }
    
    if (isEditing.value) {
      if (!id) throw new Error('Missing Promo ID for update')
      const { error } = await supabase
        .from('promo_codes')
        .update(promoData)
        .eq('id', id)
      
      if (error) throw error
      $q.notify({ type: 'positive', message: 'Promo code updated successfully' })
    } else {
      const { error } = await supabase
        .from('promo_codes')
        .insert([promoData])
      
      if (error) throw error
      $q.notify({ type: 'positive', message: 'Promo code created successfully' })
    }
    showDialog.value = false
    fetchPromos()
  } catch (err) {
    console.error(err)
    $q.notify({ 
      type: 'negative', 
      message: 'Failed to save: ' + (err.message || 'Database error'),
      multiLine: true
    })
  } finally {
    saving.value = false
  }
}

async function toggleStatus(promo) {
  try {
    const { error } = await supabase
      .from('promo_codes')
      .update({ active: promo.active })
      .eq('id', promo.id)
    if (error) throw error
  } catch (err) {
    console.error(err)
    promo.active = !promo.active // Revert on failure
  }
}

function confirmDelete(promo) {
  $q.dialog({
    title: 'Confirm',
    message: `Delete promo code "${promo.code}"?`,
    dark: true,
    ok: { color: 'red', label: 'Delete' },
    cancel: true
  }).onOk(async () => {
    const dismiss = $q.notify({
      group: false,
      timeout: 0,
      spinner: true,
      message: 'Deleting promo code...',
      color: 'amber-6'
    })

    try {
      if (!promo.id) throw new Error('Invalid Promo ID')

      const { error } = await supabase
        .from('promo_codes')
        .delete()
        .eq('id', promo.id)

      if (error) throw error
      
      dismiss()
      $q.notify({ type: 'positive', message: 'Promo code deleted successfully' })
      fetchPromos()
    } catch (err) {
      dismiss()
      console.error('Delete error:', err)
      $q.notify({ 
        type: 'negative', 
        cardClass: 'bg-red-10',
        message: 'Delete failed: ' + (err.message || 'Check your permissions'),
        multiLine: true,
        timeout: 5000
      })
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
