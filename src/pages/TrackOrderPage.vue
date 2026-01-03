<template>
  <q-page class="bg-black text-white q-pa-md flex flex-center">
    <div v-if="loading" class="text-center">
      <q-spinner-dots color="amber-6" size="40px" />
      <div class="q-mt-md text-grey-5">Finding your order...</div>
    </div>

    <div v-else-if="!order" class="text-center">
      <q-icon name="error_outline" color="red-5" size="80px" />
      <div class="text-h5 q-mt-md text-weight-bold">Order not found</div>
      <div class="text-grey-5 q-mb-xl">The tracking ID is invalid or you don't have access.</div>
      <q-btn label="Back to Home" color="grey-9" text-color="white" to="/" rounded />
    </div>

    <div v-else class="tracking-container" style="width: 100%; max-width: 800px; padding-top: 100px;">
      <q-card class="glass-card q-pa-xl">
        <div class="row items-center justify-between q-mb-xl">
          <div>
            <div class="text-h6 text-grey-5">Order #{{ order.id.split('-')[0].toUpperCase() }}</div>
            <div class="text-h5 text-white text-weight-bold">Tracking Status</div>
          </div>
          <q-btn flat color="amber-6" icon="refresh" label="Refresh" @click="fetchOrder" />
        </div>

        <!-- Tracking Timeline -->
        <div class="q-px-lg">
          <q-timeline color="amber-6" dark>
            <q-timeline-entry
              title="Order Placed"
              :subtitle="formatDate(order.created_at)"
              icon="shopping_basket"
              :color="getStatusColor('Pending')"
            >
              <div>Your order has been received and is waiting for verification.</div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Verified"
              icon="verified"
              :color="getStatusColor('Verified')"
              :subtitle="order.status === 'Pending' ? 'Waiting...' : 'Completed'"
            >
              <div>We have verified your phone numbers and delivery details.</div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Processing"
              icon="settings"
              :color="getStatusColor('Processing')"
              :subtitle="['Verified', 'Processing'].includes(order.status) ? (order.status === 'Processing' ? 'Active' : 'Queued') : (isAfter('Processing') ? 'Completed' : 'Upcoming')"
            >
              <div>Your items are being prepared and packed.</div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Out for Delivery"
              icon="local_shipping"
              :color="getStatusColor('Shipped')"
              :subtitle="order.status === 'Shipped' ? 'In Transit' : (isAfter('Shipped') ? 'Completed' : 'Upcoming')"
            >
              <div>Your order is on its way to your address.</div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Delivered"
              icon="done_all"
              :color="getStatusColor('Delivered')"
              :subtitle="order.status === 'Delivered' ? formatDate(order.updated_at) : 'Waiting...'"
            >
              <div>Order successfully delivered. Hope to see you again!</div>
            </q-timeline-entry>
          </q-timeline>
        </div>

        <q-separator dark class="q-my-xl" />

        <!-- Order Summary -->
        <div class="q-gutter-y-md">
           <div class="row justify-between items-center bg-grey-9 q-pa-md rounded-borders">
              <span class="text-subtitle1">Current Status:</span>
              <q-badge :color="statusBadgeColor" text-color="black" class="text-weight-bold q-pa-sm text-subtitle2">
                {{ order.status.toUpperCase() }}
              </q-badge>
           </div>
           
           <div class="text-grey-5 text-center q-mt-md">
             Order placed by: <b>{{ order.name }}</b><br>
             Address: {{ order.address }}
           </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from 'boot/supabase'
import { date } from 'quasar'

const route = useRoute()
const order = ref(null)
const loading = ref(true)

const statusOrder = ['Pending', 'Verified', 'Processing', 'Shipped', 'Delivered']

async function fetchOrder() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', route.params.id)
      .maybeSingle()

    if (error) throw error
    order.value = data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function formatDate(d) {
  return date.formatDate(d, 'MMM DD, YYYY - hh:mm A')
}

function getStatusColor(status) {
  if (!order.value) return 'grey-9'
  const currentIdx = statusOrder.indexOf(order.value.status)
  const entryIdx = statusOrder.indexOf(status)
  
  if (order.value.status === 'Cancelled') return status === 'Cancelled' ? 'red' : 'grey-9'
  
  if (entryIdx < currentIdx) return 'green-5'
  if (entryIdx === currentIdx) return 'amber-6'
  return 'grey-9'
}

function isAfter(status) {
  if (!order.value) return false
  const currentIdx = statusOrder.indexOf(order.value.status)
  const entryIdx = statusOrder.indexOf(status)
  return currentIdx > entryIdx
}

const statusBadgeColor = computed(() => {
  if (!order.value) return 'grey'
  switch (order.value.status) {
    case 'Pending': return 'orange-5'
    case 'Verified': return 'blue-5'
    case 'Processing': return 'indigo-5'
    case 'Shipped': return 'purple-5'
    case 'Delivered': return 'green-5'
    case 'Cancelled': return 'red-5'
    default: return 'grey'
  }
})

onMounted(fetchOrder)
</script>

<style lang="scss" scoped>
.glass-card {
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
}
</style>
