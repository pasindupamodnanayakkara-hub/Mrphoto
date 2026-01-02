<template>
  <q-page class="bg-black text-white font-roboto">
    <div class="q-py-xl container q-mx-auto">
      <h3 class="text-h3 text-weight-thin text-center q-mb-xl text-uppercase">Exclusive Products</h3>
      
      <!-- Grid Layout for Products Page -->
      <div class="row q-col-gutter-xl justify-center">
        <div v-for="(product, index) in products" :key="index" class="col-12 col-sm-6 col-md-4">
          <q-card class="bg-grey-10 text-white product-card column no-wrap full-height">
            <!-- Image Container -->
            <div class="relative-position overflow-hidden col-auto">
              <q-img :src="product.image" :ratio="1" class="product-img" />
              <div class="absolute-top-right q-pa-sm">
                <q-chip color="amber" text-color="black" size="sm" class="text-weight-bold">
                  {{ product.tag }}
                </q-chip>
              </div>
            </div>
            
            <!-- Content -->
            <q-card-section class="col column q-pa-md">
              <div class="text-h6 text-weight-medium q-mb-xs">{{ product.name }}</div>
              <div class="text-grey-5 text-caption q-mb-auto">{{ product.description }}</div>
              
              <div class="q-mt-md row items-center justify-between">
                <div class="text-h5 text-amber text-weight-bold">{{ product.price }}</div>
                <q-btn flat round icon="add_shopping_cart" color="white" class="add-btn" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const products = [
  {
    name: 'Vintage Wood Frame',
    description: 'Hand-carved solid oak frame with museum-grade glass.',
    price: '45.00',
    tag: 'Best Seller',
    image: 'https://cdn.quasar.dev/img/parallax2.jpg' // Placeholder
  },
  {
    name: 'Premium Photo Album',
    description: 'Leather-bound album with 50 archival quality pages.',
    price: '89.00',
    tag: 'New',
    image: 'https://cdn.quasar.dev/img/parallax1.jpg' // Placeholder
  },
  {
    name: 'Canvas Wall Art',
    description: 'High-resolution print on textured canvas, gallery wrapped.',
    price: '120.00',
    tag: 'Popular',
    image: 'https://cdn.quasar.dev/img/mountains.jpg' // Placeholder
  },
  {
    name: 'Acrylic Photo Block',
    description: 'Modern freestanding photo block with 3D depth effect.',
    price: '55.00',
    tag: 'Trendy',
    image: 'https://cdn.quasar.dev/img/quora.jpg' // Placeholder
  },
  {
    name: 'Custom Portrait Print',
    description: 'Fine art paper print with custom color grading.',
    price: 'Rs. 3,000',
    tag: 'Classic',
    image: 'src/assets/hero_studio.png'
  }
]
</script>

<style lang="scss" scoped>
.font-roboto {
  font-family: 'Roboto', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
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
