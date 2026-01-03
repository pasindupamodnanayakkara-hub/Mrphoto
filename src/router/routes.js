const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'products', component: () => import('pages/ProductsPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'checkout', component: () => import('pages/CheckoutPage.vue') },
      { path: 'track-order/:id', component: () => import('pages/TrackOrderPage.vue') }
    ],
  },

  {
    path: '/admin/auth',
    component: () => import('layouts/AdminAuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/admin/LoginPage.vue') },
      { path: 'signup', component: () => import('pages/admin/SignupPage.vue') }
    ]
  },
  {
    path: '/admin/system',
    component: () => import('layouts/AdminDashboardLayout.vue'),
    children: [
      { path: 'manage', component: () => import('pages/admin/SystemManagePage.vue') },
      { path: 'users', component: () => import('pages/admin/UsersPage.vue') },
      { path: 'products', component: () => import('pages/admin/ProductsManagePage.vue') },
      { path: 'services', component: () => import('pages/admin/ServicesManagePage.vue') },
      { path: 'orders', component: () => import('pages/admin/OrdersManagePage.vue') },
      { path: 'promo-codes', component: () => import('pages/admin/PromoCodesManagePage.vue') },
      { path: 'messages', component: () => import('pages/admin/MessagesManagePage.vue') },
      { path: 'extras', component: () => import('pages/admin/ExtrasManagePage.vue') },
      { path: 'reviews', component: () => import('pages/admin/ReviewsManagePage.vue') },
      { path: 'gallery', component: () => import('pages/admin/ReviewGalleryManagePage.vue') },
      { path: 'settings', component: () => import('pages/admin/SettingsManagePage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
