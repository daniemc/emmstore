<template>
    <div>
        <DataAdmin 
        :name="{
            singular: 'Vendedor',
            plural: 'Vendedores',
        }"
        :fields="fields"        
        :data="vendors"
        />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
})

const fields = {
    id: {
        text: '#',
        create: false,
        editable: false,
        type: 'id'
    },
    name: {
        text: 'Nombre',
        create: true,
        editable: true,
        type: 'string'
    },
    last_name: {
        text: 'Apellidos',
        create: true,
        editable: true,
        type: 'string'
    },
    username: {
        text: 'username',
        create: true,
        editable: true,
        type: 'string'
    },
    email: {
        text: 'Email',
        create: true,
        editable: true,
        type: 'string'
    },
    doc_type: {
        text: 'T. Doc',
        create: true,
        editable: true,
        type: 'string'
    },
    doc: {
        text: 'Doc',
        create: true,
        editable: true,
        type: 'string'
    },
    phone: {
        text: 'Tel',
        create: true,
        editable: true,
        type: 'string'
    },
    status: {
        text: 'Activo',
        create: false,
        editable: true,
        type: 'boolean'
    },
    stores: {
        text: 'Tiendas/Bodegas',
        create: false,
        editable: false,
        type: 'list',
        list: {
            key: 'name',
        }
    }
}

const vendors = ref([])

async function getData() {
    const { hasError, data } = await useApi(
        'GET',
        '/vendors'
    )

    if (!hasError) {
        vendors.value = data.data.filter(
            (user) => user.roles.some((userRole) => userRole.role.name === 'StoreSeller')
        )
        .map((user) => ({
            ...user,
            stores: user.stores.map((store) => ({ ...store.store }))
        }))
    }
}

onMounted(() => { 
    getData()
})
</script>

<style lang="scss" scoped>

</style>