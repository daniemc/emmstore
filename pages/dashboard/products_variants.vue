<template>
    <div>
        <DataAdmin 
        :name="{
            singular: 'Variante Producto',
            plural: 'Variantes de producto',
        }"
        :fields="fields"
        allow-create
        allow-edit
        allow-delete
        autoCrud
        :crud="{
            c: '/products_varitants',
            r: '/products_varitants',
            u: '/product_varitants',
            d: '/product_varitants',
        }"
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
    product_id: {
        text: '#Producto',
        create: true,
        editable: false,
        type: 'model',
        model: {
            type: 'number',
            dataOrigin: 'fetch',
            listURL: '/products',
            value: 'id',
            text: 'name',
        }
    },
    product: {
        text: 'Producto',
        create: false,
        editable: false,
        type: 'object',
        ObjectKey: 'name'
    },
    code: {
        text: 'Codigo',
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
    color: {
        text: 'Color',
        create: true,
        editable: true,
        type: 'string'
    },
    size: {
        text: 'Tamaño',
        create: true,
        editable: true,
        type: 'string'
    },
    brand: {
        text: 'Marca',
        create: true,
        editable: true,
        type: 'string'
    },
    characteristic1: {
        text: 'Caracteristica 1',
        create: true,
        editable: true,
        type: 'string'
    },
    characteristic2: {
        text: 'Caracteristica 2',
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