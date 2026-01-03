<template>
  <q-page class="q-pa-md admin-page">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-white text-weight-bold">Customer Reviews</div>
        <div class="text-subtitle2 text-grey-5">Monitor and manage public testimonials</div>
      </div>
      <q-space />
    </div>

    <!-- Stats Dashboard -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-sm-4">
        <q-card class="glass-stat-card q-pa-lg text-center">
          <div class="text-subtitle2 text-grey-5 text-uppercase letter-spacing-md">Average Rating</div>
          <div class="text-h2 text-weight-bolder text-amber-6 q-my-sm">{{ averageRating }}</div>
          <q-rating :model-value="averageRatingNumber" size="24px" color="amber-6" readonly />
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card class="glass-stat-card q-pa-lg text-center">
          <div class="text-subtitle2 text-grey-5 text-uppercase letter-spacing-md">Total Reviews</div>
          <div class="text-h2 text-weight-bolder text-white q-my-sm">{{ reviews.length }}</div>
          <div class="text-caption text-grey-5">Submission volume</div>
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card class="glass-stat-card q-pa-lg text-center">
          <div class="text-subtitle2 text-grey-5 text-uppercase letter-spacing-md">Pending Approval</div>
          <div class="text-h2 text-weight-bolder text-orange-6 q-my-sm">{{ pendingCount }}</div>
          <div class="text-caption text-grey-5">Awaiting review</div>
        </q-card>
      </div>
    </div>

    <!-- Reviews Table -->
    <q-card class="glass-table no-shadow">
      <q-table
        :rows="reviews"
        :columns="columns"
        row-key="id"
        dark
        flat
        bordered
        :loading="loading"
        card-class="bg-transparent"
        table-header-class="text-amber-6 text-uppercase letter-spacing-sm"
      >
        <template v-slot:body-cell-rating="props">
          <q-td :props="props">
            <q-rating
              v-model="props.value"
              size="18px"
              color="amber-6"
              readonly
            />
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip 
              dense 
              :color="props.value === 'approved' ? 'green-9' : 'orange-9'" 
              text-color="white"
              style="min-width: 80px;"
              class="text-weight-bold"
            >
              {{ props.value.toUpperCase() }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <div class="row no-wrap q-gutter-x-sm">
              <q-btn 
                v-if="props.row.status === 'pending'"
                flat round dense color="green-5" icon="check_circle" size="sm" 
                @click="updateStatus(props.row, 'approved')" 
              >
                <q-tooltip>Approve</q-tooltip>
              </q-btn>
              <q-btn 
                v-if="props.row.status === 'approved'"
                flat round dense color="orange-5" icon="unpublished" size="sm" 
                @click="updateStatus(props.row, 'pending')" 
              >
                <q-tooltip>Set to Pending</q-tooltip>
              </q-btn>
              <q-btn flat round dense color="red-5" icon="delete_sweep" size="sm" @click="confirmDelete(props.row)" />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
const loading = ref(false)
const reviews = ref([])

const columns = [
  { name: 'created_at', label: 'Date', field: 'created_at', align: 'left', format: val => new Date(val).toLocaleDateString(), sortable: true },
  { name: 'customer_name', label: 'Customer', field: 'customer_name', align: 'left', sortable: true },
  { name: 'rating', label: 'Rating', field: 'rating', align: 'left', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
]

const averageRating = computed(() => {
  if (!reviews.value.length) return '0.0'
  const total = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (total / reviews.value.length).toFixed(1)
})

const averageRatingNumber = computed(() => parseFloat(averageRating.value))
const pendingCount = computed(() => reviews.value.filter(r => r.status === 'pending').length)

onMounted(fetchReviews)

async function fetchReviews() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    reviews.value = data
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to fetch reviews' })
  } finally {
    loading.value = false
  }
}

async function updateStatus(review, status) {
  try {
    const { error } = await supabase
      .from('feedbacks')
      .update({ status })
      .eq('id', review.id)
    if (error) throw error
    $q.notify({ type: 'positive', message: `Review ${status}` })
    fetchReviews()
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to update status' })
  }
}

function confirmDelete(review) {
  $q.dialog({
    title: 'Confirm',
    message: `Delete feedback from "${review.customer_name}"?`,
    dark: true,
    ok: { color: 'red', label: 'Delete' },
    cancel: true
  }).onOk(async () => {
    try {
      const { error } = await supabase.from('feedbacks').delete().eq('id', review.id)
      if (error) throw error
      $q.notify({ type: 'positive', message: 'Review deleted' })
      fetchReviews()
    } catch {
      $q.notify({ type: 'negative', message: 'Failed to delete' })
    }
  })
}
</script>

<style lang="scss" scoped>
.glass-table {
  background: rgba(15, 15, 15, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
}

.glass-stat-card {
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 193, 7, 0.3);
    background: rgba(40, 40, 40, 0.5);
  }
}

.letter-spacing-md {
  letter-spacing: 2px;
}
.letter-spacing-sm {
  letter-spacing: 1px;
}
</style>
