<template>
  <q-card class="glass-dialog" style="min-width: 350px; max-width: 800px; width: 100%">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6 text-white text-weight-bold">{{ isEdit ? 'Edit Address' : 'Add New Address' }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup color="white" />
    </q-card-section>

    <q-card-section class="q-pa-lg">
      <q-form @submit="onSubmit" class="q-gutter-y-sm">
        <!-- Country -->
        <q-select
          v-model="form.country"
          :options="['Sri Lanka']"
          label="Country/Region"
          dark outlined dense color="amber-6"
          class="input-glass"
          :rules="[val => !!val || 'Country is required']"
        />

        <div class="text-subtitle2 text-white q-mt-sm">Contact information</div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.contact_name"
              label="Contact Name"
              placeholder="Full Name"
              dark outlined dense color="amber-6"
              class="input-glass"
              :rules="[val => !!val || 'Name is required']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.mobile_number"
              label="Mobile Number"
              placeholder="+94"
              dark outlined dense color="amber-6"
              class="input-glass"
              mask="###########"
              :rules="[val => !!val || 'Mobile number is required']"
            />
          </div>
        </div>

        <div class="text-subtitle2 text-white q-mt-sm">Address</div>
        <div class="row q-col-gutter-md">
           <div class="col-12">
            <q-input
              v-model="form.street_address"
              label="Street Address"
              dark outlined dense color="amber-6"
              class="input-glass"
              :rules="[val => !!val || 'Street address is required']"
            />
           </div>
           
           <div class="col-12">
            <q-input
              v-model="form.apartment"
              label="Apt, suite, unit, etc (optional)"
              dark outlined dense color="amber-6"
              class="input-glass"
            />
           </div>

          <div class="col-12 col-md-6">
            <q-input
              v-model="form.city"
              label="City"
              dark outlined dense color="amber-6"
              class="input-glass"
              :rules="[val => !!val || 'City is required']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.zip_code"
              label="ZIP Code"
              dark outlined dense color="amber-6"
              class="input-glass"
              :rules="[val => !!val || 'ZIP code is required']"
            />
          </div>
          <div class="col-12 col-md-6">
             <q-select
              v-model="form.district"
              label="District"
              :options="districtOptions"
              @filter="filterDistricts"
              use-input
              input-debounce="0"
              dark outlined dense color="amber-6"
              class="input-glass"
              behavior="menu"
              :rules="[val => !!val || 'District is required']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-select
              v-model="form.province"
              label="Province"
              :options="provinceOptions"
              @filter="filterProvinces"
              use-input
              input-debounce="0"
              dark outlined dense color="amber-6"
              class="input-glass"
              behavior="menu"
              :rules="[val => !!val || 'Province is required']"
            />
          </div>
        </div>

        <q-checkbox
          v-model="form.is_default"
          label="Set as default shipping address"
          dark
          color="amber-6"
        />

        <div class="row justify-end q-mt-lg">
          <q-btn label="Cancel" color="white" flat v-close-popup class="q-mr-sm" />
          <q-btn :label="isEdit ? 'Update Address' : 'Confirm'" type="submit" color="amber-6" text-color="black" :loading="loading" rounded unelevated class="text-weight-bold" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  },
  loading: Boolean
})

const emit = defineEmits(['save'])

const isEdit = computed(() => !!props.initialData.id)

const form = ref({
  country: 'Sri Lanka',
  contact_name: '',
  mobile_number: '',
  street_address: '',
  apartment: '',
  province: '',
  district: '',
  city: '',
  zip_code: '',
  is_default: false,
  ...props.initialData
})

const allProvinces = ref([
  { id: 1, name: 'Western' }, { id: 2, name: 'Central' }, { id: 3, name: 'Southern' },
  { id: 4, name: 'Northern' }, { id: 5, name: 'Eastern' }, { id: 6, name: 'North Western' },
  { id: 7, name: 'North Central' }, { id: 8, name: 'Uva' }, { id: 9, name: 'Sabaragamuwa' }
])

const allDistricts = ref([
  { id: 1, province_id: 1, name: 'Colombo' }, { id: 2, province_id: 1, name: 'Gampaha' }, { id: 3, province_id: 1, name: 'Kalutara' },
  { id: 4, province_id: 2, name: 'Kandy' }, { id: 5, province_id: 2, name: 'Matale' }, { id: 6, province_id: 2, name: 'Nuwara Eliya' },
  { id: 7, province_id: 3, name: 'Galle' }, { id: 8, province_id: 3, name: 'Matara' }, { id: 9, province_id: 3, name: 'Hambantota' },
  { id: 10, province_id: 4, name: 'Jaffna' }, { id: 11, province_id: 4, name: 'Kilinochchi' }, { id: 12, province_id: 4, name: 'Mannar' }, { id: 13, province_id: 4, name: 'Vavuniya' }, { id: 14, province_id: 4, name: 'Mullaitivu' },
  { id: 15, province_id: 5, name: 'Trincomalee' }, { id: 16, province_id: 5, name: 'Batticaloa' }, { id: 17, province_id: 5, name: 'Ampara' },
  { id: 18, province_id: 6, name: 'Kurunegala' }, { id: 19, province_id: 6, name: 'Puttalam' },
  { id: 20, province_id: 7, name: 'Anuradhapura' }, { id: 21, province_id: 7, name: 'Polonnaruwa' },
  { id: 22, province_id: 8, name: 'Badulla' }, { id: 23, province_id: 8, name: 'Moneragala' },
  { id: 24, province_id: 9, name: 'Ratnapura' }, { id: 25, province_id: 9, name: 'Kegalle' }
])

const provinceOptions = ref([])
const districtOptions = ref([])

// No onMounted or fetch logic needed for static data

function filterProvinces(val, update) {
  if (val === '') {
    update(() => {
      provinceOptions.value = allProvinces.value.map(p => p.name)
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    provinceOptions.value = allProvinces.value
      .map(p => p.name)
      .filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

function filterDistricts(val, update) {
  // Determine relevant districts based on selected province
  let relevantDistricts = allDistricts.value
  const selectedProvince = allProvinces.value.find(p => p.name === form.value.province)
  
  if (selectedProvince) {
    relevantDistricts = relevantDistricts.filter(d => d.province_id === selectedProvince.id)
  }

  if (val === '') {
    update(() => {
      districtOptions.value = relevantDistricts.map(d => d.name)
    })
    return
  }
  
  update(() => {
    const needle = val.toLowerCase()
    districtOptions.value = relevantDistricts
      .map(d => d.name)
      .filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

// Watch for Province changes to clear invalid district
watch(() => form.value.province, (newVal) => {
  const selectedProvince = allProvinces.value.find(p => p.name === newVal)
  if (selectedProvince) {
    // Check if current district belongs to new province
    const currentDistrict = allDistricts.value.find(d => d.name === form.value.district)
    if (currentDistrict && currentDistrict.province_id !== selectedProvince.id) {
      form.value.district = ''
    }
  }
})

// Watch for District changes to auto-select Province
watch(() => form.value.district, (newVal) => {
  if (!newVal) return
  if (!form.value.province) {
    const district = allDistricts.value.find(d => d.name === newVal)
    if (district) {
      const province = allProvinces.value.find(p => p.id === district.province_id)
      if (province) {
        form.value.province = province.name
      }
    }
  }
})

function onSubmit() {
  emit('save', form.value)
}
</script>

<style lang="scss" scoped>
.glass-dialog {
  background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
}

.input-glass :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.input-glass :deep(.q-field__control:before) {
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.input-glass :deep(.q-field__control:hover:before) {
  border-color: #ffc107; /* amber-6 */
}
</style>
