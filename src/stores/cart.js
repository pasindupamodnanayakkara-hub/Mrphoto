import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalCount = computed(() => {
    return items.value.reduce((acc, item) => acc + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return items.value.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0)
  })

  function addToCart(product) {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  function removeFromCart(productId) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      if (items.value[index].quantity > 1) {
        items.value[index].quantity--
      } else {
        items.value.splice(index, 1)
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  return { items, totalCount, cartTotal, addToCart, removeFromCart, clearCart }
})
