<template>
  <q-page class="q-pa-md admin-page">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-white text-weight-bold">Customer Messages</div>
        <div class="text-subtitle2 text-grey-5">Inquiries from the website contact form</div>
      </div>
      <q-space />
      <q-btn flat round color="amber-6" icon="refresh" @click="fetchMessages">
        <q-tooltip>Refresh</q-tooltip>
      </q-btn>
    </div>

    <!-- Messages Table -->
    <q-card class="glass-table">
      <q-table
        :rows="messages"
        :columns="columns"
        row-key="id"
        dark
        flat
        bordered
        :loading="loading"
        card-class="bg-transparent"
        table-header-class="text-grey-5"
        :pagination="pagination"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip 
              :color="getStatusColor(props.value)" 
              text-color="white" 
              size="sm" 
              class="text-weight-bold"
            >
              {{ props.value.toUpperCase() }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn flat round dense color="amber-5" icon="visibility" size="sm" @click="viewMessage(props.row)" class="q-mr-xs" />
            <q-btn flat round dense color="red-5" icon="delete" size="sm" @click="confirmDelete(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- View Message Dialog -->
    <q-dialog v-model="showDialog">
      <q-card class="glass-dialog" style="min-width: 50%" v-if="selectedMessage">
        <q-card-section class="row items-center">
          <div class="text-h6 text-white">{{ selectedMessage.subject || 'Message Detail' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup color="grey" />
        </q-card-section>

        <q-card-section class="q-pa-lg">
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12 col-sm-6">
              <div class="text-caption text-grey-6 uppercase text-weight-bold">From</div>
              <div class="text-white text-subtitle1">{{ selectedMessage.name }}</div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="text-caption text-grey-6 uppercase text-weight-bold">Email</div>
              <div class="text-white text-subtitle1">{{ selectedMessage.email || 'N/A' }}</div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="text-caption text-grey-6 uppercase text-weight-bold">Phone</div>
              <div class="text-white text-subtitle1">{{ selectedMessage.phone || 'N/A' }}</div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="text-caption text-grey-6 uppercase text-weight-bold">Date Received</div>
              <div class="text-white text-subtitle1">{{ formatDate(selectedMessage.created_at) }}</div>
            </div>
          </div>

          <q-separator dark class="q-mb-md" style="opacity: 0.1" />

          <div class="text-caption text-grey-6 uppercase text-weight-bold q-mb-xs">Message 内容</div>
          <div class="message-content text-white bg-black-transparent q-pa-md rounded-borders shadow-1">
            {{ selectedMessage.message }}
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
           <q-btn 
            flat 
            label="Mark as Read" 
            color="green" 
            v-if="selectedMessage.status === 'new'" 
            @click="updateStatus('read')" 
          />
          <q-btn flat label="Close" color="grey" v-close-popup />
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
const messages = ref([])
const showDialog = ref(false)
const selectedMessage = ref(null)

const pagination = ref({
  rowsPerPage: 10,
  sortBy: 'created_at',
  descending: true
})

const columns = [
  { name: 'created_at', label: 'Date', field: 'created_at', align: 'left', format: val => formatDate(val), sortable: true },
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'subject', label: 'Subject', field: 'subject', align: 'left', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'center', sortable: true },
  { name: 'actions', label: 'Actions', align: 'right' }
]

onMounted(fetchMessages)

async function fetchMessages() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    messages.value = data
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to load messages' })
  } finally {
    loading.value = false
  }
}

function formatDate(date) {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getStatusColor(status) {
  switch (status) {
    case 'new': return 'blue-6'
    case 'read': return 'grey-6'
    case 'replied': return 'green-6'
    default: return 'grey-8'
  }
}

function viewMessage(msg) {
  selectedMessage.value = msg
  showDialog.value = true
}

async function updateStatus(newStatus) {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status: newStatus })
      .eq('id', selectedMessage.value.id)

    if (error) throw error
    
    selectedMessage.value.status = newStatus
    $q.notify({ type: 'positive', message: 'Status updated' })
    fetchMessages()
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Update failed' })
  }
}

function confirmDelete(msg) {
  $q.dialog({
    title: 'Confirm',
    message: 'Delete this message permanently?',
    dark: true,
    ok: { color: 'red', label: 'Delete' },
    cancel: true
  }).onOk(async () => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', msg.id)

      if (error) throw error
      $q.notify({ type: 'positive', message: 'Message deleted' })
      fetchMessages()
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

.bg-black-transparent {
  background: rgba(0, 0, 0, 0.3);
}

.message-content {
  white-space: pre-wrap;
  min-height: 150px;
  line-height: 1.6;
}
</style>
