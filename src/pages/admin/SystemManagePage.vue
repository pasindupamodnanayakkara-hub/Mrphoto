<template>
  <q-page class="q-pa-md admin-page">
    <div class="row items-center q-mb-lg">
      <div class="col">
        <div class="text-h5 text-white text-weight-bold">Platform Status</div>
        <div class="text-subtitle2 text-grey-5">Real-time system overview and business metrics</div>
      </div>
      <div class="col-auto">
        <q-btn flat round color="amber-6" icon="refresh" @click="fetchDashboardData" :loading="loading">
          <q-tooltip>Refresh Data</q-tooltip>
        </q-btn>
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <!-- Stats Cards -->
      <div class="col-12 col-sm-6 col-md-3">
         <q-card class="glass-widget stats-card">
           <q-card-section class="row items-center no-wrap">
             <div>
                <div class="text-h6 text-white text-weight-bold">Total Users</div>
                <div class="text-subtitle2 text-grey-5">All time clients</div>
             </div>
             <q-space />
             <div class="icon-box bg-grey-9 text-amber-4">
               <q-icon name="group" size="24px" />
             </div>
           </q-card-section>
           <q-card-section class="text-h3 text-weight-bolder text-white q-pt-sm">
             {{ totalUsers }}
           </q-card-section>
           <q-card-section class="text-caption text-grey-5 row items-center q-pt-none">
             <q-icon name="north_east" color="green-5" class="q-mr-xs" /> 
             <span class="text-green-5 text-weight-bold">Live</span> 
             <span class="q-ml-xs">updated now</span>
           </q-card-section>
         </q-card>
      </div>
      
       <div class="col-12 col-sm-6 col-md-3">
          <q-card class="glass-widget stats-card">
            <q-card-section class="row items-center no-wrap">
              <div>
                 <div class="text-h6 text-white text-weight-bold">Revenue</div>
                 <div class="text-subtitle2 text-grey-5">Net Income (LKR)</div>
              </div>
              <q-space />
              <div class="icon-box bg-grey-9 text-green-4">
                <q-icon name="payments" size="24px" />
              </div>
            </q-card-section>
            <q-card-section class="text-h4 text-weight-bolder text-white q-pt-sm">
              {{ totalRevenue.toLocaleString() }}
            </q-card-section>
            <q-card-section class="text-caption text-grey-5 row items-center q-pt-none">
              <span class="text-grey-5">Excluding Cancelled</span>
            </q-card-section>
          </q-card>
       </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="glass-widget stats-card">
            <q-card-section class="row items-center no-wrap">
              <div>
                 <div class="text-h6 text-white text-weight-bold">Total Orders</div>
                 <div class="text-subtitle2 text-grey-5">Lifetime orders</div>
              </div>
              <q-space />
             <div class="icon-box bg-grey-9 text-blue-4">
                <q-icon name="shopping_cart" size="24px" />
              </div>
            </q-card-section>
            <q-card-section class="text-h3 text-weight-bolder text-white q-pt-sm">
              {{ totalOrders }}
            </q-card-section>
            <q-card-section class="text-caption text-grey-5 row items-center q-pt-none">
              <span class="text-grey-5 text-green-5 text-weight-bold">Live</span>
            </q-card-section>
          </q-card>
       </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="glass-widget stats-card">
            <q-card-section class="row items-center no-wrap">
              <div>
                 <div class="text-h6 text-white text-weight-bold">Platform</div>
                 <div class="text-subtitle2 text-grey-5">E-commerce ready</div>
              </div>
              <q-space />
              <div class="icon-box bg-grey-9 text-orange-4">
                <q-icon name="storefront" size="24px" />
              </div>
            </q-card-section>
            <q-card-section class="text-h3 text-weight-bolder text-white q-pt-sm">
              Active
            </q-card-section>
            <q-card-section class="text-caption text-grey-5 row items-center q-pt-none">
              <span class="text-grey-5">Ordering is live</span>
            </q-card-section>
          </q-card>
       </div>
    </div>

    <!-- Main Content -->
     <div class="row q-col-gutter-md q-mt-md">
       <div class="col-12 col-md-8">
         <q-card class="glass-widget full-height">
            <q-card-section class="row items-center">
              <div class="text-h6 text-white text-weight-bold">Recent Activities</div>
              <q-space />
              <q-btn flat round icon="more_horiz" color="grey-5" />
            </q-card-section>
            
            <!-- Empty State if no activities -->
            <div v-if="recentActivities.length === 0" class="flex flex-center q-pa-lg text-grey-5 column">
               <q-icon name="history" size="40px" class="q-mb-sm text-grey-8" />
               <div>No recent activities found</div>
            </div>

            <q-list v-else class="q-px-sm">
               <!-- Placeholder loop removed, awaiting real activity data structure -->
            </q-list>
         </q-card>
       </div>
        <div class="col-12 col-md-4">
          <q-card class="glass-widget full-height">
             <q-card-section>
               <div class="text-h6 text-white text-weight-bold">Platform Status</div>
             </q-card-section>
              <q-card-section class="q-gutter-y-lg">
                <!-- DB Status -->
                <div class="bg-grey-9 q-pa-md rounded-borders border-glass">
                   <div class="row items-center justify-between">
                      <div class="column">
                        <span class="text-subtitle2 text-white">Database</span>
                        <span class="text-caption text-grey-5">Supabase Cloud</span>
                      </div>
                      <q-chip :color="dbOnline ? 'green-9' : 'red-9'" text-color="white" icon="fiber_manual_record" size="sm">
                        {{ dbOnline ? 'Online' : 'Offline' }}
                      </q-chip>
                   </div>
                </div>

                <!-- Storage Summary -->
                <div class="q-gutter-y-md">
                   <div class="text-subtitle2 text-grey-4">Content Summary</div>
                   
                   <div>
                      <div class="row justify-between q-mb-sm text-caption text-grey-4">
                        <span>Managed Products</span>
                        <span class="text-amber-6 text-weight-bold">{{ totalProducts }}</span>
                      </div>
                      <q-linear-progress :value="totalProducts / 50" color="amber-6" track-color="grey-9" class="rounded-borders" size="4px" />
                   </div>

                   <div>
                      <div class="row justify-between q-mb-sm text-caption text-grey-4">
                        <span>Our Services</span>
                        <span class="text-blue-5 text-weight-bold">{{ totalServices }}</span>
                      </div>
                      <q-linear-progress :value="totalServices / 20" color="blue-5" track-color="grey-9" class="rounded-borders" size="4px" />
                   </div>
                </div>

                <div class="q-mt-xl bg-grey-9 q-pa-md rounded-borders status-footer">
                    <div class="text-subtitle2 text-white row items-center">
                      <q-icon name="analytics" class="q-mr-xs" color="amber-6" /> System Insights
                    </div>
                    <div class="text-caption text-grey-5 q-mt-xs">
                      The platform is currently optimized. All images are limited to 1MB to ensure high-performance loading for clients.
                    </div>
                </div>
              </q-card-section>
          </q-card>
        </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from 'boot/supabase'
import { useQuasar } from 'quasar'


const $q = useQuasar()
const totalUsers = ref(0)
const totalProducts = ref(0)
const totalServices = ref(0)
const totalRevenue = ref(0)
const totalOrders = ref(0)
const dbOnline = ref(true)
const loading = ref(false)
const recentActivities = ref([])

onMounted(() => {
  fetchDashboardData()
})

async function fetchDashboardData() {
  loading.value = true
  try {
    // 1. Fetch Total Users
    const { count: userCount, error: userError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact' })
    if (userError) throw userError
    totalUsers.value = userCount || 0

    // 2. Fetch Total Products
    const { count: productCount, error: productError } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
    if (productError) throw productError
    totalProducts.value = productCount || 0

    // 3. Fetch Total Services
    const { count: serviceCount, error: serviceError } = await supabase
      .from('services')
      .select('*', { count: 'exact' })
    if (serviceError) throw serviceError
    totalServices.value = serviceCount || 0

    // 4. Fetch Orders & Revenue
    const { data: orderData, count: orderCount, error: orderError } = await supabase
      .from('orders')
      .select('net_amount, status', { count: 'exact' })
    
    if (orderError) throw orderError
    
    totalOrders.value = orderCount || 0
    if (orderData) {
      totalRevenue.value = orderData
        .filter(o => o.status !== 'Cancelled')
        .reduce((sum, o) => sum + parseFloat(o.net_amount || 0), 0)
    }

    dbOnline.value = true
  } catch (error) {
    dbOnline.value = false
    console.error(error)
    $q.notify({
      type: 'negative',
      message: 'Failed to sync with database: ' + error.message
    })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.glass-widget {
  background: rgba(25, 25, 25, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  transition: transform 0.3s ease, border-color 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
}

.stats-card {
  height: 100%;
}
</style>
