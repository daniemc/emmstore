<template>
    <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-4 border border-gray-500 rounded-lg p-4">
            <div class="flex gap-2">
                <Text bold>Tienda:</Text>
                <Text>{{ store.name }}</Text>
            </div>
            <div class="flex gap-2">
                <Text bold>Codigo:</Text>
                <Text>{{ store.code }}</Text>
            </div>
            <div class="flex gap-2">
                <Text bold>Descripción:</Text>
                <Text>{{ store.description }}</Text>
            </div>
            <div class="flex gap-2">
                <Text bold>Tienda Activo:</Text>
                <div v-if="store.active"
                class="badge badge-info">
                    Activo
                </div>
                <div v-else
                class="badge badge-info">
                    Inactivo
                </div>
            </div>
            <div class="flex gap-2">
                <Text bold>Es Bodega:</Text>
                <div v-if="store.warehouse"
                class="badge badge-info">
                    Si
                </div>
                <div v-else
                class="badge badge-info">
                    No
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4 border border-gray-500 rounded-lg p-4">
            <Text bold>Usuarios de tienda:</Text>
            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Acceso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(userStore, index) in userStores"
                    class="hover:bg-gray-200 cursor-pointer"
                    >
                        <td class="p-2">{{ userStore.name }}</td>
                        <td class="flex justify-center p-2">
                            <InputCheck 
                            v-model="userStore.userHasAcces"
                            @change="(value) => handleUserStore(userStore, value)"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth',
    roles: ['SuperAdmin', 'Admin', 'StoreAdmin']
})


const storeId = ref(null)
const store = ref({
    users: []
})
const users = ref([])


const userStores = computed(() => {
    return users.value.map((user) => {
        const userHasAcces = store.value.users.some((_) => _.user_id === user.id)
        return {
            ...user,
            userHasAcces,
        }
    })
})

async function handleUserStore(user, assign) {
    const payload = {
        user_id: user.id,
        store_id: store.value.id,
        active: assign,
    }
    const { hasError, data } = await useApi(
        'POST',
        `/store/users`,
        payload
    )
    if (!hasError) {
        getStoreData()
    }
}

async function getUsersData() {
    const { hasError, data } = await useApi(
        'GET',
        `/users`
    )
    if (!hasError) {
        users.value = data.data
    }
}

async function getStoreData() {
    const { hasError, data } = await useApi(
        'GET',
        `/stores/${storeId.value}`
    )
    if (!hasError) {
        store.value = data.data
    }
}   

onMounted(() => {
    const route = useRoute()
    storeId.value = route.params.id
    getUsersData()
    getStoreData()
})
</script>

<style lang="scss" scoped>

</style>