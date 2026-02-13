<template>
  <q-page class="q-pa-md bg-black">
    <div class="row q-col-gutter-lg justify-center profile-container" style="padding-top: 100px;">
      
      <!-- Account Details -->
      <div class="col-12 col-md-5">
        <q-card class="glass-card q-pa-lg q-mb-md">
          <q-card-section class="text-center">
            <q-avatar size="100px" color="amber-6" text-color="black" class="q-mb-md text-weight-bold shadow-10">
              {{ avatarPlaceholder }}
            </q-avatar>
            <div class="text-h5 text-white text-weight-bold">My Profile</div>
            <div class="text-grey-5 text-subtitle2">Manage your account information</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="updateProfile" class="q-gutter-md">
              <q-input
                v-model="profile.full_name"
                label="Full Name"
                dark
                outlined
                color="amber-6"
                class="input-glass"
              >
                <template v-slot:prepend>
                  <q-icon name="person" color="grey-6" />
                </template>
              </q-input>

              <q-input
                v-model="profile.email"
                label="Email"
                dark
                outlined
                readonly
                color="amber-6"
                class="input-glass"
                hint="Email cannot be changed"
              >
                <template v-slot:prepend>
                  <q-icon name="email" color="grey-6" />
                </template>
              </q-input>

              <q-input
                v-model="profile.phone"
                label="Phone Number"
                dark
                outlined
                color="amber-6"
                class="input-glass"
                mask="###########"
                hint="Used for order verification"
              >
                <template v-slot:prepend>
                  <q-icon name="phone" color="grey-6" />
                </template>
              </q-input>

              <q-btn
                label="Save Profile Info"
                type="submit"
                color="amber-6"
                class="full-width q-py-sm text-weight-bold text-black q-mt-md"
                rounded
                unelevated
                :loading="loading"
              />
              
              <q-btn
                flat
                label="Logout"
                type="button"
                color="red-5"
                class="full-width q-mt-sm"
                @click="handleLogout"
              />
            </q-form>
          </q-card-section>
        </q-card>

        <!-- Addresses Section -->
        <q-card class="glass-card q-pa-lg">
           <div class="row items-center justify-between q-mb-md">
            <div class="text-h6 text-white text-weight-bold">My Addresses</div>
            <q-btn 
              icon="add" 
              label="Add New" 
              color="amber-6" 
              text-color="black" 
              size="sm" 
              rounded 
              unelevated 
              @click="openAddressDialog()"
            />
          </div>

          <div v-if="addressesLoading" class="flex flex-center q-pa-md">
             <q-spinner-dots color="amber-6" size="30px" />
          </div>

          <div v-else-if="addresses.length === 0" class="text-center q-pa-md text-grey-5">
            No addresses saved yet.
          </div>

          <q-list v-else separator dark>
            <q-item v-for="addr in addresses" :key="addr.id" class="q-px-none">
              <q-item-section>
                <q-item-label class="text-white text-weight-bold">
                  {{ addr.contact_name }}
                  <q-chip v-if="addr.is_default" color="amber-6" text-color="black" size="xs" class="q-ml-sm">Default</q-chip>
                </q-item-label>
                <q-item-label caption class="text-grey-4">
                  {{ addr.mobile_number }}
                </q-item-label>
                <q-item-label caption class="text-grey-5">
                  {{ addr.street_address }}, {{ addr.city }}, {{ addr.province }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="row q-gutter-sm">
                  <q-btn icon="edit" flat dense color="amber-6" size="sm" @click="openAddressDialog(addr)" />
                  <q-btn icon="delete" flat dense color="red-5" size="sm" @click="deleteAddress(addr.id)" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- Order History -->
      <div class="col-12 col-md-7">
        <q-card class="glass-card q-pa-lg full-height">
          <div class="text-h5 text-white text-weight-bold q-mb-md">Order History</div>
          
          <div v-if="ordersLoading" class="flex flex-center q-pa-xl">
            <q-spinner-dots color="amber-6" size="40px" />
          </div>

          <div v-else-if="orders.length === 0" class="flex flex-center q-pa-xl text-grey-5 column">
            <q-icon name="shopping_bag" size="60px" class="q-mb-md text-grey-9" />
            <div class="text-h6">No orders yet</div>
            <p class="q-mt-sm">Start shopping and your orders will appear here.</p>
            <q-btn label="Go to Store" color="amber-6" text-color="black" to="/products" rounded unelevated class="q-mt-md" />
          </div>

          <q-list v-else separator dark>
            <q-item v-for="order in orders" :key="order.id" class="q-py-md q-px-none">
              <q-item-section>
                <q-item-label class="text-white text-weight-bold row items-center">
                  Order #{{ order.id.split('-')[0].toUpperCase() }}
                  <q-chip :color="getStatusColor(order.status)" text-color="black" class="text-weight-bold q-ml-sm" size="xs">
                    {{ order.status }}
                  </q-chip>
                </q-item-label>
                <q-item-label caption class="text-grey-5 q-mt-xs">
                  {{ formatDate(order.created_at) }} • {{ order.order_items?.length || 0 }} items
                </q-item-label>
                <q-item-label class="text-amber-5 text-weight-bold q-mt-sm">
                  LKR {{ order.net_amount }}
                </q-item-label>
              </q-item-section>
              
              <q-item-section side>
                <q-btn 
                  outline 
                  color="amber-6" 
                  label="Track" 
                  rounded 
                  dense 
                  padding="4px 16px"
                  :to="`/track-order/${order.id}`"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

    </div>

    <!-- Address Dialog -->
    <q-dialog v-model="showAddressDialog">
      <AddressForm 
        :initial-data="editingAddress" 
        :loading="addressSubmitting"
        @save="handleAddressSave" 
      />
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from 'boot/supabase'
import { useQuasar, date } from 'quasar'
import { useRouter } from 'vue-router'
import AddressForm from 'components/AddressForm.vue'

const $q = useQuasar()
const router = useRouter()
const loading = ref(false)
const ordersLoading = ref(true)

const profile = ref({
  full_name: '',
  email: '',
  phone: '',
  role: ''
})

const orders = ref([])

// Address Management
const addresses = ref([])
const addressesLoading = ref(false)
const showAddressDialog = ref(false)
const editingAddress = ref({})
const addressSubmitting = ref(false)

const avatarPlaceholder = computed(() => {
  return profile.value.full_name ? profile.value.full_name.charAt(0).toUpperCase() : '?'
})

async function fetchProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    router.push('/admin/auth/login')
    return
  }

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (data) {
    profile.value = data
  }
}

async function fetchAddresses() {
  addressesLoading.value = true
  try {
     const { data: { user } } = await supabase.auth.getUser()
     if (!user) return

     const { data, error } = await supabase
      .from('shipping_addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })
    
    if (error) throw error
    addresses.value = data
  } catch (err) {
    console.error('Error fetching addresses:', err)
  } finally {
    addressesLoading.value = false
  }
}

function openAddressDialog(addr = null) {
  if (addr) {
    editingAddress.value = { ...addr }
  } else {
    editingAddress.value = {}
  }
  showAddressDialog.value = true
}

async function handleAddressSave(formData) {
  addressSubmitting.value = true
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // If setting as default, unset others first
    if (formData.is_default) {
      await supabase
        .from('shipping_addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
    }

    let error
    if (formData.id) {
      // Update
      const { error: updateError } = await supabase
        .from('shipping_addresses')
        .update({
          ...formData,
          user_id: user.id // Ensure user_id is set
        })
        .eq('id', formData.id)
      error = updateError
    } else {
      // Insert
      const { error: insertError } = await supabase
        .from('shipping_addresses')
        .insert([{
          ...formData,
          user_id: user.id
        }])
      error = insertError
    }

    if (error) throw error
    
    $q.notify({ type: 'positive', message: 'Address saved successfully!' })
    showAddressDialog.value = false
    fetchAddresses()

  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to save address' })
  } finally {
    addressSubmitting.value = false
  }
}

async function deleteAddress(id) {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to delete this address?',
    cancel: true,
    persistent: true,
    dark: true,
    color: 'amber-6'
  }).onOk(async () => {
    try {
      const { error } = await supabase
        .from('shipping_addresses')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      $q.notify({ type: 'positive', message: 'Address deleted' })
      fetchAddresses()
    } catch (err) {
      console.error(err)
      $q.notify({ type: 'negative', message: 'Failed to delete address' })
    }
  })
}

async function fetchOrders() {
  ordersLoading.value = true
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    orders.value = data
  } catch (err) {
    console.error(err)
  } finally {
    ordersLoading.value = false
  }
}

async function updateProfile() {
  loading.value = true
  try {
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.value.full_name,
        phone: profile.value.phone
      })
      .eq('id', user.id)

    if (error) throw error

    $q.notify({
      type: 'positive',
      message: 'Profile updated successfully!'
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Error updating profile'
    })
  } finally {
    loading.value = false
  }
}

async function handleLogout() {
  await supabase.auth.signOut()
  router.push('/')
}

function getStatusColor(status) {
  switch (status) {
    case 'Pending': return 'orange-5'
    case 'Verified': return 'blue-5'
    case 'Processing': return 'indigo-5'
    case 'Shipped': return 'purple-5'
    case 'Delivered': return 'green-5'
    case 'Cancelled': return 'red-5'
    default: return 'grey'
  }
}

function formatDate(d) {
  return date.formatDate(d, 'MMM DD, YYYY')
}

onMounted(() => {
  $q.dark.set(true)
  fetchProfile()
  fetchAddresses()
  fetchOrders()
})
</script>

<style lang="scss" scoped>
.glass-card {
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.input-glass :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
