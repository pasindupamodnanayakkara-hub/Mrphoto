<template>
  <q-page class="bg-black text-white q-pa-md flex flex-center">
    <div class="checkout-container" style="width: 100%; max-width: 1000px; padding-top: 100px;">
      <div class="row q-col-gutter-xl">
        
        <!-- Left Column: Checkout Form -->
        <div class="col-12 col-md-7">
          <q-card class="glass-card q-pa-lg">
            <div class="text-h5 text-weight-bold q-mb-md">Delivery Details</div>
            
            <!-- Address Selection -->
            <div class="q-mb-lg">
               <div class="text-subtitle2 text-grey-5 q-mb-sm">Select Address</div>
               
               <div v-if="addressesLoading" class="flex flex-center q-pa-md">
                 <q-spinner-dots color="amber-6" size="20px" />
               </div>

               <div v-if="!addressesLoading && addresses.length > 0" class="row q-col-gutter-sm">
                 <div class="col-12" v-for="addr in addresses" :key="addr.id">
                   <q-card 
                    class="cursor-pointer address-card q-pa-md" 
                    :class="{ 'selected-address': selectedAddressId === addr.id }"
                    @click="selectAddress(addr)"
                    flat bordered
                   >
                     <div class="row items-center justify-between">
                       <div class="text-weight-bold">{{ addr.contact_name }}</div>
                       <q-icon v-if="selectedAddressId === addr.id" name="check_circle" color="amber-6" />
                     </div>
                     <div class="text-caption text-grey-4">{{ addr.mobile_number }}</div>
                     <div class="text-caption text-grey-5">{{ addr.street_address }}<span v-if="addr.apartment">, {{ addr.apartment }}</span></div>
                     <div class="text-caption text-grey-5">{{ addr.city }}, {{ addr.zip_code }}</div>
                   </q-card>
                 </div>
               </div>

                <q-btn 
                  outline 
                  icon="add" 
                  label="Add New Address" 
                  color="amber-6" 
                  class="full-width q-mt-md"
                  rounded
                  @click="openAddressDialog"
                />
            </div>

            <q-form @submit="processCheckout" class="q-gutter-y-md">
              <q-input
                v-model="orderForm.notes"
                label="Special Notes / Instructions"
                dark outlined color="amber-6"
                type="textarea"
                class="input-glass"
                hint="Preferred delivery time, landmarks, etc."
              />


              
              <q-separator dark class="q-my-lg" />
              
              <div class="text-caption text-grey-6 q-mb-md">
                * We will contact you at your primary phone number to verify the order before processing.
              </div>

              <q-btn
                type="submit"
                label="Place Order (COD)"
                color="amber-6"
                text-color="black"
                class="full-width q-py-md text-weight-bold shadow-10"
                rounded
                unelevated
                lazy-rules
                :loading="submitting"
                :disable="cartStore.items.length === 0 || !selectedAddressId"
              />
            </q-form>
          </q-card>
        </div>

        <!-- Right Column: Order Summary -->
        <div class="col-12 col-md-5">
          <q-card class="glass-card q-pa-lg sticky-summary">
            <div class="text-h6 text-weight-bold q-mb-md">Order Summary</div>
            
            <q-list separator dark>
              <q-item v-for="item in cartStore.items" :key="item.id" class="q-px-none q-py-md">
                <q-item-section avatar>
                  <q-img :src="item.image" style="width: 50px; height: 50px; border-radius: 8px;" />
                  <q-badge color="amber-6" text-color="black" floating>{{ item.quantity }}</q-badge>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold text-white">{{ item.name }}</q-item-label>
                  <q-item-label caption class="text-grey-5">LKR {{ item.price }} each</q-item-label>
                </q-item-section>
                <q-item-section side class="text-white text-weight-bold">
                  LKR {{ parseFloat(item.price) * item.quantity }}
                </q-item-section>
              </q-item>
            </q-list>

            <!-- Extras Selection -->
            <div v-if="availableExtras.length > 0" class="q-mt-md">
              <div class="text-subtitle2 text-grey-5 q-mb-sm">Gift Add-ons (Optional)</div>
              <div class="bg-grey-10 q-pa-sm rounded-borders border-glass">
                <q-list dense>
                  <q-item v-for="extra in availableExtras" :key="extra.id" tag="label" v-ripple class="q-px-sm">
                    <q-item-section side>
                      <q-checkbox v-model="selectedExtras" :val="extra" color="amber-6" dark />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-white">{{ extra.name }}</q-item-label>
                      <q-item-label caption class="text-grey-6 text-italic">LKR {{ extra.price }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>

            <!-- Promo Code Section -->
            <div class="bg-grey-10 q-pa-md rounded-borders border-glass q-mt-md">
              <div class="text-subtitle2 text-grey-5 q-mb-sm">Promo Code</div>
              <div class="row q-col-gutter-sm">
                <div class="col">
                  <q-input
                    v-model="promoInput"
                    label="Enter Promo Code"
                    dark dense outlined color="amber-6"
                    class="input-glass"
                    :disable="!!appliedPromo"
                  />
                </div>
                <div class="col-auto">
                  <q-btn 
                    v-if="!appliedPromo"
                    label="Apply" 
                    color="amber-6" 
                    text-color="black" 
                    unelevated 
                    @click="applyPromo"
                    :loading="promoLoading"
                  />
                  <q-btn 
                    v-else
                    label="Remove" 
                    color="red-5" 
                    flat 
                    @click="removePromo"
                  />
                </div>
              </div>
              <div v-if="appliedPromo" class="text-caption text-green-5 q-mt-xs">
                Promo '{{ appliedPromo.code }}' applied: 
                {{ appliedPromo.discount_type === 'percentage' ? appliedPromo.discount_value + '%' : 'LKR ' + appliedPromo.discount_value }} off
              </div>
            </div>

            <div class="q-mt-md q-gutter-y-sm">
              <div class="row justify-between text-body2 text-grey-4">
                <span>Subtotal</span>
                <span>LKR {{ cartStore.cartTotal }}</span>
              </div>
              
              <!-- Selected Extras Summary -->
              <div v-if="selectedExtrasTotal > 0" class="row justify-between text-body2 text-grey-4">
                <span>Gift Add-ons</span>
                <span>+ LKR {{ selectedExtrasTotal }}</span>
              </div>

              <div v-if="discountAmount > 0" class="row justify-between text-body2 text-green-5">
                <span>Discount</span>
                <span>- LKR {{ discountAmount }}</span>
              </div>
              <div class="row justify-between text-body2 text-grey-4">
                <span>Delivery Charge</span>
                <span class="text-red-5 text-weight-bold text-italic">+ Additional</span>
              </div>
              <div class="text-right text-caption text-grey-6" style="margin-top: -5px">
                (Based on your location)
              </div>
              
              <q-separator dark class="q-my-sm" />
              
              <div class="row justify-between text-h6 text-weight-bold text-white">
                <span>Total</span>
                <span class="text-amber-6">LKR {{ netTotal }}</span>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Success Dialog -->
    <q-dialog v-model="successDialog" persistent>
      <q-card class="glass-dialog text-center q-pa-xl" style="max-width: 400px">
        <q-icon name="check_circle" color="green-5" size="80px" class="q-mb-md" />
        <div class="text-h5 text-white text-weight-bold">Order Placed!</div>
        <div class="text-grey-5 q-my-md">
          Thank you for choosing Mr. Photo. Your order has been received. 
        </div>
        <q-btn 
          label="Track My Order" 
          color="amber-6" 
          text-color="black" 
          rounded 
          class="full-width q-mb-sm" 
          @click="goToTracking" 
        />
        <q-btn label="Back to Home" flat color="grey-5" class="full-width" to="/" v-close-popup />
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAddressDialog">
      <AddressForm 
        :loading="addressSubmitting"
        @save="handleAddressSave" 
      />
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from 'stores/cart'
import { supabase } from 'boot/supabase'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import AddressForm from 'components/AddressForm.vue'

const cartStore = useCartStore()
const $q = useQuasar()
const router = useRouter()

const submitting = ref(false)
const successDialog = ref(false)
const orderId = ref(null)

const orderForm = ref({
  notes: ''
})

// Address Logic
const addresses = ref([])
const addressesLoading = ref(false)
const selectedAddressId = ref(null)
const selectedAddressObj = computed(() => addresses.value.find(a => a.id === selectedAddressId.value))

const showAddressDialog = ref(false)
const addressSubmitting = ref(false)

// Promo Code Logic
const promoInput = ref('')
const appliedPromo = ref(null)
const promoLoading = ref(false)

const discountAmount = computed(() => {
  if (!appliedPromo.value) return 0
  const subtotal = parseFloat(cartStore.cartTotal) || 0
  const discountValue = parseFloat(appliedPromo.value.discount_value) || 0
  
  if (appliedPromo.value.discount_type === 'percentage') {
    return (subtotal * discountValue) / 100
  } else {
    return discountValue
  }
})

const availableExtras = ref([])
const selectedExtras = ref([])

const selectedExtrasTotal = computed(() => {
  return selectedExtras.value.reduce((total, item) => total + parseFloat(item.price), 0)
})

const netTotal = computed(() => {
  const subtotal = parseFloat(cartStore.cartTotal) || 0
  const extras = selectedExtrasTotal.value || 0
  const discount = discountAmount.value || 0
  const total = (subtotal + extras) - discount
  return Math.max(0, total).toFixed(2) // Ensure positive and formatted
})

async function fetchExtras() {
  try {
    const { data, error } = await supabase
      .from('product_extras')
      .select('*')
      .eq('active', true)
      .order('price', { ascending: true })
    if (error) throw error
    availableExtras.value = data || []
  } catch (err) {
    console.error('Error fetching extras:', err)
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
    addresses.value = data || []
    
    // Auto select default
    const defaultAddr = data.find(a => a.is_default)
    if (defaultAddr) {
      selectedAddressId.value = defaultAddr.id
    } else if (data.length > 0) {
      selectedAddressId.value = data[0].id
    }

  } catch (err) {
    console.error('Error fetching addresses:', err)
  } finally {
    addressesLoading.value = false
  }
}

function selectAddress(addr) {
  selectedAddressId.value = addr.id
}

function openAddressDialog() {
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
    
    // Always insert in checkout
    const { error: insertError } = await supabase
        .from('shipping_addresses')
        .insert([{
          ...formData,
          user_id: user.id
        }])
    
    if (insertError) throw insertError
    
    $q.notify({ type: 'positive', message: 'Address added!' })
    showAddressDialog.value = false
    await fetchAddresses() // Refresh list

  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to add address' })
  } finally {
    addressSubmitting.value = false
  }
}

async function applyPromo() {
  if (!promoInput.value) return
  
  promoLoading.value = true
  try {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', promoInput.value.toUpperCase())
      .eq('active', true)
      .maybeSingle()
      
    if (error) throw error
    
    if (!data) {
      $q.notify({ type: 'negative', message: 'Invalid or expired promo code' })
      return
    }

    const usageLimit = parseInt(data.usage_limit) || 0
    const usedCount = parseInt(data.used_count) || 0
    
    if (usageLimit > 0 && usedCount >= usageLimit) {
      $q.notify({ type: 'negative', message: 'This promo code usage limit has been reached.' })
      return
    }

    if (cartStore.cartTotal < data.min_purchase) {
      $q.notify({ 
        type: 'warning', 
        message: `Minimum purchase of LKR ${data.min_purchase} required for this promo.` 
      })
      return
    }

    appliedPromo.value = data
    $q.notify({ type: 'positive', message: 'Promo code applied!' })
  } catch (err) {
    console.error(err)
  } finally {
    promoLoading.value = false
  }
}

function removePromo() {
  appliedPromo.value = null
  promoInput.value = ''
}

async function processCheckout() {
  if (cartStore.items.length === 0) return
  if (!selectedAddressObj.value) {
    $q.notify({ type: 'warning', message: 'Please select a delivery address' })
    return
  }

  submitting.value = true
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      $q.notify({ type: 'negative', message: 'Please login to place an order' })
      router.push('/admin/auth/login')
      return
    }

    const addr = selectedAddressObj.value
    const formattedAddress = `${addr.street_address}${addr.apartment ? ', ' + addr.apartment : ''}, ${addr.city}, ${addr.district}, ${addr.province}, ${addr.country}, ${addr.zip_code}`

    // 1. Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_id: user.id,
        name: addr.contact_name,
        phone1: addr.mobile_number,
        phone2: null, // Removed separate phone2 field requirement
        address: formattedAddress, // Storing formatted address string
        notes: orderForm.value.notes,
        promo_code_id: appliedPromo.value?.id || null,
        total_amount: cartStore.cartTotal + selectedExtrasTotal.value,
        discount_amount: discountAmount.value,
        net_amount: netTotal.value,
        status: 'Pending',
        extras: selectedExtras.value
      }])
      .select()
      .single()

    if (orderError) throw orderError
    orderId.value = order.id

    // 2. Add order items
    const orderItems = cartStore.items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_time: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    // 3. Update promo usage count
    if (appliedPromo.value?.id) {
      const { data: currentPromo, error: promoFetchError } = await supabase
        .from('promo_codes')
        .select('used_count')
        .eq('id', appliedPromo.value.id)
        .single()
      
      if (!promoFetchError && currentPromo) {
        await supabase
          .from('promo_codes')
          .update({ used_count: (currentPromo.used_count || 0) + 1 })
          .eq('id', appliedPromo.value.id)
      }
    }

    // Success!
    cartStore.clearCart()
    successDialog.value = true
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: err.message || 'Failed to place order' })
  } finally {
    submitting.value = false
  }
}

function goToTracking() {
  router.push(`/track-order/${orderId.value}`)
}

onMounted(async () => {
  fetchExtras()
  fetchAddresses()
})
</script>

<style lang="scss" scoped>
.glass-card {
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
}

.input-glass :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
}

.sticky-summary {
  position: sticky;
  top: 100px;
}

.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.address-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 193, 7, 0.5);
  }
  
  &.selected-address {
    border-color: #ffc107;
    background: rgba(255, 193, 7, 0.1);
  }
}
</style>
