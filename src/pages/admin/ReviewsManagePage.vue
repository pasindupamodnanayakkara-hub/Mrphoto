<template>
  <q-page class="q-pa-md admin-page">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-white text-weight-bold">Customer Reviews</div>
        <div class="text-subtitle2 text-grey-5">Monitor and manage public testimonials</div>
      </div>
      <q-space />
    </div>

    <!-- Reviews Table -->
    <q-card class="glass-table">
      <q-table
        :rows="reviews"
        :columns="columns"
        row-key="id"
        dark
        flat
        bordered
        :loading="loading"
        card-class="bg-transparent"
        table-header-class="text-grey-5"
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
            >
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn 
              v-if="props.row.status === 'pending'"
              flat round dense color="green-5" icon="check" size="sm" 
              @click="updateStatus(props.row, 'approved')" 
            >
              <q-tooltip>Approve</q-tooltip>
            </q-btn>
            <q-btn 
              v-if="props.row.status === 'approved'"
              flat round dense color="orange-5" icon="history" size="sm" 
              @click="updateStatus(props.row, 'pending')" 
            >
              <q-tooltip>Set to Pending</q-tooltip>
            </q-btn>
            <q-btn flat round dense color="red-5" icon="delete" size="sm" @click="confirmDelete(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const $q = useQuasar()
const loading = ref(false)
const reviews = ref([])

const columns = [
  { name: 'created_at', label: 'Date', field: 'created_at', align: 'left', format: val => new Date(val).toLocaleDateString() },
  { name: 'customer_name', label: 'Customer', field: 'customer_name', align: 'left', sortable: true },
  { name: 'rating', label: 'Rating', field: 'rating', align: 'left', sortable: true },
  { name: 'comment', label: 'Comment', field: 'comment', align: 'left', style: 'max-width: 300px; white-space: normal;' },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
]

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
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
</style>
