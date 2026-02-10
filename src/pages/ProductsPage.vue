<template>
  <q-page class="bg-black text-white font-roboto">
    <div class="q-py-xl container q-mx-auto" style="padding-top: 120px;">
      <h3 class="text-h3 text-weight-thin text-center q-mb-xl text-uppercase">Exclusive Products</h3>
      
      <!-- Grid Layout for Products Page - Zoom Stable -->
      <div class="product-grid row q-col-gutter-lg justify-center">
        <div v-for="(product, index) in products" :key="index" class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-card class="bg-grey-10 text-white product-card column no-wrap">
            <!-- Image Container -->
            <div class="relative-position overflow-hidden col-auto">
                <q-img 
                  :src="product.image" 
                  :ratio="1" 
                  class="product-img"
                  @error="product.image = 'https://cdn.quasar.dev/img/parallax2.jpg'"
                >
                  <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-grey-9 text-white">
                      Cannot load image
                    </div>
                  </template>
                </q-img>
                <div class="absolute-top-right q-pa-sm">
                  <q-chip color="amber" text-color="black" size="sm" class="text-weight-bold">
                    {{ product.tag || 'New' }}
                  </q-chip>
                </div>
              </div>
              
              <!-- Content -->
              <q-card-section class="col column q-pa-md">
                <div class="text-h6 text-weight-medium q-mb-xs">{{ product.name }}</div>
                <div class="text-grey-5 text-caption q-mb-auto">{{ product.description }}</div>
                
                <div class="q-mt-md row items-center justify-between">
                  <div class="text-h5 text-amber text-weight-bold">LKR {{ product.price }}</div>
                  <q-btn flat round icon="add_shopping_cart" color="white" class="add-btn" @click="handleAddToCart(product)" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="!loading && products.length === 0" class="text-center q-py-xl text-grey-5">
          <q-icon name="inventory_2" size="64px" class="q-mb-md" />
          <div class="text-h5">No products found</div>
          <p>Please check back later.</p>
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from 'boot/supabase'
  import { useCartStore } from 'stores/cart'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router'
  
  const cartStore = useCartStore()
  const $q = useQuasar()
  const router = useRouter()
  const products = ref([])
  const loading = ref(true)
  
  async function handleAddToCart(product) {
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      $q.notify({
        type: 'warning',
        message: 'Please login to add items to your cart',
        position: 'top',
        actions: [{ label: 'Login', color: 'black', handler: () => router.push('/admin/auth/login') }]
      })
      router.push('/admin/auth/login')
      return
    }
  
    cartStore.addToCart(product)
    $q.notify({
      message: `${product.name} added to cart!`,
      color: 'amber-6',
      textColor: 'black',
      icon: 'shopping_cart',
      position: 'bottom-right',
      timeout: 1500
    })
  }
  
  async function fetchProducts() {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      if (data && data.length > 0) {
        products.value = data
      } else {
        // Fallback data if DB is empty
        products.value = [
          { id: 1, name: 'Premium Wood Frame', description: 'Hand-crafted oak wood frame for timeless elegance.', price: '4500', image: 'https://cdn.quasar.dev/img/parallax2.jpg', tag: 'Best Seller' },
          { id: 2, name: 'Modern Metal Print', description: 'Sleek aluminum print with high-gloss finish.', price: '6800', image: 'https://cdn.quasar.dev/img/parallax1.jpg', tag: 'New' },
          { id: 3, name: 'Canvas Gallery Wrap', description: 'Museum-quality canvas stretched over wood.', price: '5200', image: 'https://cdn.quasar.dev/img/mountains.jpg', tag: 'Popular' },
          { id: 4, name: 'Acrylic Glass Mount', description: 'Vibrant colors with depth and clarity.', price: '7500', image: 'https://cdn.quasar.dev/img/quasar.jpg', tag: 'Premium' },
          { id: 5, name: 'Photo Book (Hardcover)', description: '20-page layflat photo book for memories.', price: '8900', image: 'https://cdn.quasar.dev/img/material.png', tag: 'Custom' },
          { id: 6, name: 'Insta-Style Prints', description: 'Set of 10 square prints for your wall.', price: '1200', image: 'https://cdn.quasar.dev/img/cat.jpg', tag: 'Fun' }
        ]
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      $q.notify({
        type: 'negative',
        message: 'Failed to load live products. Showing samples instead.',
        position: 'bottom',
        timeout: 3000
      })
      // Fallback on error too
       products.value = [
          { id: 1, name: 'Premium Wood Frame', description: 'Hand-crafted oak wood frame for timeless elegance.', price: '4500', image: 'https://cdn.quasar.dev/img/parallax2.jpg', tag: 'Best Seller' },
          { id: 2, name: 'Modern Metal Print', description: 'Sleek aluminum print with high-gloss finish.', price: '6800', image: 'https://cdn.quasar.dev/img/parallax1.jpg', tag: 'New' },
          { id: 3, name: 'Canvas Gallery Wrap', description: 'Museum-quality canvas stretched over wood.', price: '5200', image: 'https://cdn.quasar.dev/img/mountains.jpg', tag: 'Popular' },
          { id: 4, name: 'Acrylic Glass Mount', description: 'Vibrant colors with depth and clarity.', price: '7500', image: 'https://cdn.quasar.dev/img/quasar.jpg', tag: 'Premium' },
          { id: 5, name: 'Photo Book (Hardcover)', description: '20-page layflat photo book for memories.', price: '8900', image: 'https://cdn.quasar.dev/img/material.png', tag: 'Custom' },
          { id: 6, name: 'Insta-Style Prints', description: 'Set of 10 square prints for your wall.', price: '1200', image: 'https://cdn.quasar.dev/img/cat.jpg', tag: 'Fun' }
        ]
    } finally {
      loading.value = false
    }
  }

onMounted(() => {
  fetchProducts()
})
</script>

<style lang="scss" scoped>
.font-roboto {
  font-family: 'Roboto', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  
  @media (min-width: 1024px) {
    padding-left: 40px;
    padding-right: 40px;
  }
}

.product-card {
  height: 100%;
  min-height: 420px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    border-color: #FFC107;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    
    .product-img {
      transform: scale(1.1);
    }
    
    .add-btn {
      background: #FFC107;
      color: black !important;
    }
  }
}

.product-img {
  transition: transform 0.5s ease;
}

.add-btn {
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}
</style>
