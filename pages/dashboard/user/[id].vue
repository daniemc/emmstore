<template>
    <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-4 border border-gray-500 rounded-lg p-4">
            <div class="flex gap-2">
                <Text bold>Nombres:</Text>
                <Text>{{ user.name }}</Text>
            </div>
            <div class="flex gap-2">
                <Text bold>Apellidos:</Text>
                <Text>{{ user.last_name }}</Text>
            </div>
            <div class="flex gap-2">
                <Text bold>Usuario:</Text>
                <Text>{{ user.username }}</Text>
            </div>
            <div class="flex gap-2">
                <Text bold>Correo Electronico:</Text>
                <Text>{{ user.email }}</Text>
            </div>
            <div class="flex gap-2">
                <Text bold>Documento:</Text>
                <Text>{{ user.doc_type}} - {{ user.doc }}</Text>
            </div>
            <div class="flex gap-2">
                <Text bold>Telefono:</Text>
                <Text>{{ user.phone }}</Text>
            </div>
        </div>
        <div class="flex flex-col gap-4 border border-gray-500 rounded-lg p-4">
            <Text bold>Roles de usuario:</Text>
            <table>
                <thead>
                    <tr>
                        <th>Rol</th>
                        <th>Activo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(userRole, index) in userRoles"
                    class="hover:bg-gray-200 cursor-pointer"
                    >
                        <td class="p-2">{{ userRole.name }}</td>
                        <td class="flex justify-center p-2">
                            <InputCheck 
                            v-model="userRole.userHasRole"
                            @change="(value) => handleUserRole(userRole, value)"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-col gap-4 border border-gray-500 rounded-lg p-4">
            <div class="flex gap-2">
                <Text bold>Usuario Activo:</Text>
                <div v-if="user.status"
                class="badge badge-success">
                    Activo
                </div>
                <div v-else
                class="badge badge-error">
                    Inactivo
                </div>
            </div>
            <div class="flex gap-2">
                <Text bold>Usuario Bloqueado:</Text>
                <div v-if="user.status"
                class="badge badge-success">
                    No
                </div>
                <div v-else
                class="badge badge-error">
                    Si
                </div>
            </div>
            <div class="flex gap-2">
                <Text bold>Intentos de ingreso fallidos:</Text>
                <div class="badge"
                :class="{
                    'badge-success': user.login_attempts === 0,
                    'badge-info': user.login_attempts === 1,
                    'badge-warning': user.login_attempts === 2,
                    'badge-error': user.login_attempts > 2,
                }"
                >
                    {{ user.login_attempts }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'app',
    middleware: 'auth'
})

const userId = ref(null)
const user = ref({
    roles: []
})
const roles = ref([])

const userRoles = computed(() => {
    return roles.value.map((role) => {
        const userHasRole = user.value.roles.some((_) => _.role_id === role.id)
        return {
            ...role,
            userHasRole,
        }
    })
})

async function handleUserRole(role, assign) {
    console.log(role, assign)
    const payload = {
        role_id: role.id,
        user_id: user.value.id,
        active: assign,
    }
    const { hasError, data } = await useApi(
        'POST',
        `/user/roles`,
        payload
    )
    if (!hasError) {
        getUserData
    }
}

async function getUserData() {
    const { hasError, data } = await useApi(
        'GET',
        `/user/${userId.value}`
    )
    if (!hasError) {
        user.value = data.user
    }
}

async function getRolesData() {
    const { hasError, data } = await useApi(
        'GET',
        `/roles`
    )
    if (!hasError) {
        roles.value = data.data
    }
}

onMounted(() => {
    const route = useRoute()
    userId.value = route.params.id
    getUserData()
    getRolesData()
})
</script>

<style lang="scss" scoped>

</style>