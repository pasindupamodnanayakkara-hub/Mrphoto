<template>
  <q-page class="q-pa-md admin-page">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-white text-weight-bold">Order Management</div>
        <div class="text-subtitle2 text-grey-5">Verify, process and track customer orders</div>
      </div>
      <q-space />
      <div class="row q-gutter-x-sm">
        <q-btn flat dark icon="refresh" @click="fetchOrders">
          <q-tooltip>Refresh</q-tooltip>
        </q-btn>
      </div>
    </div>

    <!-- Action Board -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div v-for="stat in orderStats" :key="stat.label" class="col-12 col-sm-6 col-md-2">
        <q-card 
          class="stat-mini-card cursor-pointer transition-all" 
          :class="{ 'active-stat': statusFilter === stat.value }"
          @click="statusFilter = stat.value"
        >
          <q-card-section class="q-pa-sm text-center">
            <div class="text-caption text-grey-5 text-uppercase text-weight-bold">{{ stat.label }}</div>
            <div class="row items-center justify-center q-gutter-x-sm">
              <q-icon :name="stat.icon" :color="stat.color" size="xs" />
              <div class="text-h6 text-white text-weight-bold">{{ stat.count }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Filters -->
    <div class="row q-mb-md justify-between items-center">
      <q-btn-toggle
        v-model="statusFilter"
        flat
        toggle-color="amber-6"
        color="grey-7"
        dark
        round
        dense
        :options="[
          { label: 'All', value: 'All' },
          { label: 'Pending', value: 'Pending' },
          { label: 'Verified', value: 'Verified' },
          { label: 'Packing', value: 'On Packing' },
          { label: 'Shipped', value: 'Shipped' },
          { label: 'Delivered', value: 'Delivered' }
        ]"
      />
      <div class="text-grey-5 text-caption">
        Items: {{ filteredOrders.length }}
      </div>
    </div>

    <!-- Orders Table -->
    <q-card class="glass-table">
      <q-table
        :rows="filteredOrders"
        :columns="columns"
        row-key="id"
        dark
        flat
        bordered
        :loading="loading"
        card-class="bg-transparent"
        table-header-class="text-grey-5"
      >
        <template v-slot:body-cell-id="props">
          <q-td :props="props">
            <span class="text-caption text-grey-5">#{{ props.value.split('-')[0].toUpperCase() }}</span>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip :color="getStatusColor(props.value)" text-color="black" class="text-weight-bold" size="sm">
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-net_amount="props">
          <q-td :props="props">
            LKR {{ props.value }}
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn flat round dense color="amber-5" icon="visibility" size="sm" @click="viewDetails(props.row)" />
            <q-btn flat round dense color="green-5" icon="edit" size="sm" @click="editOrder(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Order Interaction Dialog (Edit Status/Notes) -->
    <q-dialog v-model="showEditDialog" persistent>
      <q-card class="glass-dialog" style="min-width: 400px">
        <q-card-section class="row items-center">
          <div class="text-h6 text-white text-weight-bold">Update Order Status</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup color="grey" />
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
           <div class="text-subtitle2 text-grey-5">Customer: {{ currentOrder?.name }}</div>
           
           <q-select
             v-model="editData.status"
             :options="['Pending', 'Verified', 'On Packing', 'Shipped', 'Delivered', 'Cancelled']"
             label="Tracking Status"
             outlined dark color="amber-6"
             class="input-glass"
           >
             <template v-slot:prepend>
               <q-icon name="local_shipping" color="grey-6" />
             </template>
           </q-select>

           <div class="bg-grey-9 q-pa-md rounded-borders">
             <div class="row items-center q-mb-xs">
               <q-icon name="contact_phone" color="blue-5" class="q-mr-xs" />
               <span class="text-weight-bold">Verification Call</span>
             </div>
             <div class="text-caption text-grey-5">
               Call <b>{{ currentOrder?.phone1 }}</b> to verify the order.
               <br v-if="currentOrder?.phone2">
               Backup: {{ currentOrder?.phone2 }}
             </div>
           </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn 
            class="btn-premium-save" 
            icon="auto_awesome"
            label="Update Status Now" 
            @click="updateOrderStatus" 
            :loading="updating" 
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Order View Dialog -->
    <q-dialog v-model="showDetailsDialog">
      <q-card class="glass-dialog" style="min-width: 600px">
        <q-card-section class="row items-center">
          <div class="text-h6 text-white">Order Details</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup color="grey" />
        </q-card-section>

        <q-card-section v-if="currentOrder" class="q-gutter-y-md">
          <div class="row q-col-gutter-lg">
             <div class="col-6">
                <div class="text-subtitle2 text-grey-5">Customer Information</div>
                <div class="text-white text-weight-bold">{{ currentOrder.name }}</div>
                <div class="text-grey-4">{{ currentOrder.phone1 }}</div>
                <div v-if="currentOrder.phone2" class="text-grey-4">{{ currentOrder.phone2 }}</div>
                <div class="text-grey-4 q-mt-sm">{{ currentOrder.address }}</div>
             </div>
             <div class="col-6 text-right">
                <div class="text-subtitle2 text-grey-5">Order Date</div>
                <div class="text-white">{{ formatDate(currentOrder.created_at) }}</div>
                <div class="q-mt-md">
                   <q-chip :color="getStatusColor(currentOrder.status)" text-color="black" class="text-weight-bold">
                     {{ currentOrder.status }}
                   </q-chip>
                </div>
             </div>
          </div>

          <q-separator dark />

          <div class="text-subtitle2 text-grey-5">Order Items</div>
          <q-list separator dark>
            <q-item v-for="(item, idx) in currentOrder.order_items" :key="idx" class="q-px-none">
              <q-item-section>
                <q-item-label class="text-white">{{ item.products?.name || 'Unknown Product' }}</q-item-label>
                <q-item-label caption class="text-grey-5">LKR {{ item.price_at_time }} x {{ item.quantity }}</q-item-label>
              </q-item-section>
              <q-item-section side class="text-white text-weight-bold">
                LKR {{ parseFloat(item.price_at_time) * item.quantity }}
              </q-item-section>
            </q-item>
          </q-list>

          <q-separator dark />

          <div class="column q-gutter-y-sm">
             <div class="row justify-between text-grey-4">
               <span>Total Price:</span>
               <span>LKR {{ currentOrder.total_amount }}</span>
             </div>
             <div v-if="currentOrder.discount_amount > 0" class="row justify-between text-green-5">
               <span>
                 Promo Discount 
                 <span v-if="currentOrder.promo_codes" class="text-white text-weight-bold text-uppercase">
                   ({{ currentOrder.promo_codes.code }})
                 </span>:
               </span>
               <span>- LKR {{ currentOrder.discount_amount }}</span>
             </div>
             <div class="row justify-between text-h6 text-weight-bold text-white">
               <span>Net Amount:</span>
               <span class="text-amber-6">LKR {{ currentOrder.net_amount }}</span>
             </div>
          </div>

          <div v-if="currentOrder.notes" class="bg-grey-9 q-pa-md rounded-borders">
             <div class="text-subtitle2 text-grey-4">Customer Notes:</div>
             <div class="text-white q-mt-xs">{{ currentOrder.notes }}</div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar, date } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
const loading = ref(false)
const updating = ref(false)
const orders = ref([])
const statusFilter = ref('All')

const showEditDialog = ref(false)
const showDetailsDialog = ref(false)
const currentOrder = ref(null)
const editData = ref({
  status: ''
})

const columns = [
  { name: 'id', label: 'Order ID', field: 'id', align: 'left', sortable: true },
  { name: 'name', label: 'Customer', field: 'name', align: 'left', sortable: true },
  { name: 'net_amount', label: 'Total', field: 'net_amount', align: 'left', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'center', sortable: true },
  { name: 'created_at', label: 'Date', field: 'created_at', align: 'right', format: val => formatDate(val), sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
]

const orderStats = computed(() => {
  const counts = {
    All: orders.value.length,
    Pending: orders.value.filter(o => o.status === 'Pending').length,
    Verified: orders.value.filter(o => o.status === 'Verified').length,
    Packing: orders.value.filter(o => o.status === 'On Packing').length,
    Shipped: orders.value.filter(o => o.status === 'Shipped').length,
    Delivered: orders.value.filter(o => o.status === 'Delivered').length
  }

  return [
    { label: 'Total', value: 'All', count: counts.All, icon: 'inventory', color: 'grey-4' },
    { label: 'Pending', value: 'Pending', count: counts.Pending, icon: 'hourglass_empty', color: 'orange-5' },
    { label: 'Verified', value: 'Verified', count: counts.Verified, icon: 'check_circle', color: 'blue-5' },
    { label: 'Packing', value: 'On Packing', count: counts.Packing, icon: 'inventory_2', color: 'amber-6' },
    { label: 'Shipped', value: 'Shipped', count: counts.Shipped, icon: 'local_shipping', color: 'purple-5' },
    { label: 'Delivered', value: 'Delivered', count: counts.Delivered, icon: 'task_alt', color: 'green-5' }
  ]
})

const filteredOrders = computed(() => {
  if (statusFilter.value === 'All') return orders.value
  return orders.value.filter(o => o.status === statusFilter.value)
})

async function fetchOrders() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        promo_codes (*),
        order_items (
          *,
          products (*)
        )
      `)
      .order('created_at', { ascending: false })
      
    if (error) throw error
    orders.value = data
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to fetch orders' })
  } finally {
    loading.value = false
  }
}

function getStatusColor(status) {
  switch (status) {
    case 'Pending': return 'orange-5'
    case 'Verified': return 'blue-5'
    case 'On Packing': return 'amber-6'
    case 'Shipped': return 'purple-5'
    case 'Delivered': return 'green-5'
    case 'Cancelled': return 'red-5'
    default: return 'grey'
  }
}

function formatDate(d) {
  return date.formatDate(d, 'MMM DD, YYYY')
}

function viewDetails(order) {
  currentOrder.value = order
  showDetailsDialog.value = true
}

function editOrder(order) {
  currentOrder.value = order
  editData.value.status = order.status
  showEditDialog.value = true
}

async function updateOrderStatus() {
  updating.value = true
  try {
    const { error } = await supabase
      .from('orders')
      .update({ 
        status: editData.value.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', currentOrder.value.id)

    if (error) throw error
    
    $q.notify({ type: 'positive', message: 'Order status updated' })
    showEditDialog.value = false
    fetchOrders()
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to update order' })
  } finally {
    updating.value = false
  }
}

onMounted(fetchOrders)
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

.stat-mini-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
  }

  &.active-stat {
    border-color: #FFC107;
    background: rgba(255, 193, 7, 0.05);
  }
}

.transition-all {
  transition: all 0.3s ease;
}
</style>
