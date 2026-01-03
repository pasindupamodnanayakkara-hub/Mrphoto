<template>
  <q-page class="q-pa-md admin-page">
    <div class="row items-center q-mb-md">
      <div>
        <div class="text-h5 text-white text-weight-bold">{{ pageTitle }}</div>
        <div class="text-subtitle2 text-grey-5">{{ pageSubtitle }}</div>
      </div>
      <q-space />
      <q-btn v-if="activeTab === 'staff'" color="amber-6" text-color="black" icon="add_moderator" label="Add Staff" @click="showAddUserDialog = true" />
    </div>

    <!-- Filtering Tabs - Only show on "All" view or if no specific role in URL -->
    <q-tabs
      v-if="!route.query.role"
      v-model="activeTab"
      dense
      class="text-grey-5 q-mb-md"
      active-color="amber-6"
      indicator-color="amber-6"
      align="left"
      narrow-indicator
    >
      <q-tab name="all" :label="`All (${users.length})`" />
      <q-tab name="staff" :label="`Staff & Admins (${staffCount})`" />
      <q-tab name="customer" :label="`Customers (${customerCount})`" />
    </q-tabs>

    <q-card class="glass-table">
      <q-table
        :rows="filteredUsers"
        :columns="columns"
        row-key="id"
        dark
        flat
        bordered
        :loading="loading"
        card-class="bg-transparent"
        table-header-class="text-grey-5"
      >
        <template v-slot:body-cell-role="props">
          <q-td :props="props">
            <q-chip 
              :color="getRoleColor(props.value)" 
              text-color="white" 
              class="text-weight-bolder q-px-md"
              square
              style="border-radius: 8px; letter-spacing: 0.5px; box-shadow: 0 4px 10px -4px rgba(0,0,0,0.5);"
            >
              {{ props.value.toUpperCase() }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn flat round dense color="amber-5" icon="edit" size="sm" @click="editUser(props.row)" />
            <q-btn flat round dense color="red-5" icon="delete" size="sm" @click="confirmDelete(props.row)" />
          </q-td>
        </template>

        <template v-slot:body-cell-permissions="props">
          <q-td :props="props">
             <div class="row q-gutter-xs">
               <q-chip 
                  v-if="props.row.permissions?.can_manage_users" 
                  dense 
                  color="blue-2" 
                  text-color="blue-10" 
                  size="sm" 
                  icon="people" 
                  label="Mgmt" 
                  class="text-weight-bolder"
               />
               <q-chip 
                  v-if="props.row.permissions?.can_edit_settings" 
                  dense 
                  color="purple-2" 
                  text-color="purple-10" 
                  size="sm" 
                  icon="settings" 
                  label="Settings" 
                  class="text-weight-bolder"
               />
               <q-chip 
                  v-if="props.row.permissions?.full_access" 
                  dense 
                  color="green-2" 
                  text-color="green-10" 
                  size="sm" 
                  icon="verified" 
                  label="Full" 
                  class="text-weight-bolder"
               />
             </div>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Edit User Dialog -->
    <q-dialog v-model="showEditDialog">
      <q-card class="glass-dialog" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6 text-white">Edit User Access</div>
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
           <q-input
             v-model="editingUser.full_name"
             label="Full Name"
             outlined
             dark
             color="amber-6"
             class="input-glass"
           />

           <q-select
             v-model="editingUser.role"
             :options="['admin', 'staff', 'customer']"
             label="User Role"
             outlined
             dark
             color="amber-6"
             class="input-glass"
             @update:model-value="handleRoleChange"
           />
           
           <div class="text-subtitle2 text-grey-4 q-mt-md">Permissions</div>
           <div class="column q-gutter-sm">
             <q-toggle v-model="editingUser.permissions.can_manage_users" label="Can Manage Users" dark color="green" />
             <q-toggle v-model="editingUser.permissions.can_edit_settings" label="Can Edit Settings" dark color="green" />
             <q-toggle v-model="editingUser.permissions.full_access" label="Full System Access" dark color="red" />
           </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn flat label="Save Changes" color="amber-6" @click="saveUserChanges" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'
import { useRoute } from 'vue-router'

const $q = useQuasar()
const route = useRoute()
const loading = ref(false)
const users = ref([])
const activeTab = ref('all')
const showEditDialog = ref(false)
const showAddUserDialog = ref(false)
const editingUser = ref({ permissions: {} })

const staffCount = computed(() => users.value.filter(u => ['admin', 'staff'].includes(u.role)).length)
const customerCount = computed(() => users.value.filter(u => u.role === 'customer').length)

const pageTitle = computed(() => {
  if (activeTab.value === 'staff') return 'Staff & Administrators'
  if (activeTab.value === 'customer') return 'Customer Registry'
  return 'Full Directory'
})

const pageSubtitle = computed(() => {
  if (activeTab.value === 'staff') return 'Manage internal team access and system permissions'
  if (activeTab.value === 'customer') return 'View and manage registered studio clients'
  return 'Complete overview of all registered accounts'
})

const filteredUsers = computed(() => {
  if (activeTab.value === 'staff') {
    return users.value.filter(u => ['admin', 'staff'].includes(u.role))
  } else if (activeTab.value === 'customer') {
    return users.value.filter(u => u.role === 'customer')
  }
  return users.value
})

watch(() => route.query.role, (newRole) => {
  if (newRole) activeTab.value = newRole
})

const columns = [
  { name: 'full_name', required: true, label: 'Full Name', align: 'left', field: 'full_name', sortable: true },
  { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
  { name: 'role', align: 'center', label: 'Role', field: 'role', sortable: true },
  { name: 'permissions', align: 'left', label: 'Access Rights', field: 'permissions' },
  { name: 'created_at', align: 'right', label: 'Joined', field: 'created_at', format: (val) => new Date(val).toLocaleDateString() },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
]

onMounted(() => {
  if (route.query.role) {
    activeTab.value = route.query.role
  }
  fetchUsers()
})

async function fetchUsers() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    users.value = data
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Failed to fetch users'
    })
  } finally {
    loading.value = false
  }
}

function getRoleColor(role) {
  switch (role) {
    case 'admin': return 'red-6'
    case 'staff': return 'blue-6'
    case 'customer': return 'green-6'
    default: return 'grey-8'
  }
}

function editUser(user) {
  // Deep copy to avoid modifying the table row directly before saving
  editingUser.value = JSON.parse(JSON.stringify(user))
  // Ensure permissions object exists
  if (!editingUser.value.permissions) editingUser.value.permissions = {}
  showEditDialog.value = true
}

function handleRoleChange(newRole) {
  if (newRole === 'admin') {
    editingUser.value.permissions = {
      full_access: true,
      can_manage_users: true,
      can_edit_settings: true
    }
  } else if (newRole === 'staff') {
    editingUser.value.permissions = {
      full_access: false,
      can_manage_users: true,
      can_edit_settings: false
    }
  } else {
    editingUser.value.permissions = {
      full_access: false,
      can_manage_users: false,
      can_edit_settings: false
    }
  }
}

async function saveUserChanges() {
  try {
    // If role is customer, clear permissions for safety
    if (editingUser.value.role === 'customer') {
      editingUser.value.permissions = {}
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: editingUser.value.full_name,
        role: editingUser.value.role,
        permissions: editingUser.value.permissions
      })
      .eq('id', editingUser.value.id)
      .select()

    if (error) throw error
    
    if (!data || data.length === 0) {
      throw new Error('Update failed. You might not have permission or user not found.')
    }

    $q.notify({ type: 'positive', message: 'Account updated successfully' })
    showEditDialog.value = false
    fetchUsers() // Refresh list
  } catch (error) {
    console.error(error)
    $q.notify({ type: 'negative', message: error.message || 'Error updating account' })
  }
}

function confirmDelete(user) {
   $q.dialog({
     title: 'Confirm',
     message: 'Are you sure you want to delete this user? This cannot be undone.',
     dark: true,
     ok: { color: 'red', label: 'Delete' },
     cancel: true
   }).onOk(async () => {
     // Note: Deleting from 'profiles' might not delete from 'auth.users' directly depending on policies.
     // In a real app we need a secure edge function to delete the auth user.
     // For this demo, we will delete the profile entry.
     try {
       const { error } = await supabase.from('profiles').delete().eq('id', user.id)
       if (error) throw error
        $q.notify({ type: 'positive', message: 'User deleted' })
        fetchUsers()
     } catch (err) {
       $q.notify({ type: 'negative', message: err.message || 'Failed to delete user' })
     }
   })
}
</script>

<style lang="scss" scoped>
.glass-table {
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
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
