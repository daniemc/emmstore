<template>
    <div>
        <DataAdmin 
        :name="{
            singular: 'Producto',
            plural: 'Productos',
        }"
        :fields="fields"
        allow-create
        allow-edit
        allow-delete
        autoCrud
        :crud="{
            c: '/products',
            r: '/products',
            u: '/product',
            d: '/product',
        }"
        />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'app',
    middleware: 'auth'
})

const fields = {
    id: {
        text: '#',
        create: false,
        editable: false,
        type: 'id'
    },
    code: {
        text: 'Codigo',
        create: true,
        editable: true,
        type: 'string'
    },
    name: {
        text: 'Nombre',
        create: true,
        editable: true,
        type: 'string'
    },
    barrcode: {
        text: 'Codigo de barras',
        create: true,
        editable: true,
        type: 'string'
    },
    active: {
        text: 'Activo',
        create: true,
        editable: true,
        type: 'boolean'
    },
}
</script>

<style lang="scss" scoped>

</style>