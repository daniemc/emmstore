<template>
    <div class="drawer">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="w-full navbar bg-base-300">
      <div class="flex-none lg:hidden">
        <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div class="flex-1 gap-4 px-2 mx-2 cursor-pointer">
            <Button accent @click="navigateTo('/')">
                <i class="bx bx-home"></i>
            </Button>
            <Text bold>Panel Administrativo</Text>
      </div>
      <div class="flex-none hidden lg:block">
        <ul class="menu menu-horizontal">
          <!-- Navbar menu content here -->
          <li
          v-for="(item, index) in menu"
          :key="`menu-index-${index}`"
          @click="goToUrl(item.url)"
          >
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </div>
      <button class="btn"
      @click="logout"
      >
        Cerrar Sesion
      </button>
    </div>
    <!-- Page content here -->
    <div class="m-6">
      <slot />
    </div>
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label> 
    <ul class="menu p-4 w-80 min-h-full bg-base-200">
      <!-- Sidebar content here -->
      <li
      v-for="(item, index) in menu"
      :key="`menu-side-index-${index}`"
      @click="goToUrl(item.url)"
      >
       <span>{{ item.text }}</span>
    </li>
    </ul>
  </div>
</div>
</template>

<script setup>
const AuthStore = useAuthStore()

const userName = computed(() => AuthStore.user.name)

function goToUrl(url) {
  navigateTo(url)
}

function logout() {
    AuthStore.logout()
}

const menu = computed(() => {
  const isSuperAdmin = AuthStore.userIsSuperAdmin
  const isAdmin = AuthStore.userIsAdmin
  const items = [
    {
        text: 'Usuarios',
        url: '/dashboard/users',
        show: isSuperAdmin || isAdmin,
    },
    {
        text: 'Productos',
        url: '/dashboard/products',
        show: isSuperAdmin || isAdmin,
    },
    {
        text: 'Variantes de Productos',
        url: '/dashboard/products_variants',
        show: isSuperAdmin || isAdmin,
    },
    {
        text: 'Tipos de movimientos',
        url: '/dashboard/movements_types',
        show: isSuperAdmin || isAdmin,
    },
    {
        text: 'Tiendas',
        url: '/dashboard/stores',
        show: isSuperAdmin || isAdmin,
    },
    {
        text: 'Vendedores',
        url: '/dashboard/vendors',
        show: isSuperAdmin || isAdmin,
    },
]
  return items.filter((_) => _.show)
})

</script>

<style lang="scss" scoped>

</style>