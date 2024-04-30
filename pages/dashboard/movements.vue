<template>
    <div>
        <DataAdmin 
        :name="{
            singular: 'Movimiento',
            plural: 'Movimientos',
        }"
        :fields="fields"
        allow-create
        allow-edit
        allow-delete
        autoCrud
        :crud="{
            c: '/movements',
            r: '/movements',
            u: '/movements',
            d: '/movements',
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
        objectKey: 'name',
    },
    user: {
        text: 'Usuario',
        create: false,
        editable: false,
        type: 'object',
        objectKey: 'name',
    },
    store_id: {
        text: '#Tienda',
        create: true,
        editable: false,
        type: 'model',
        model: {
            type: 'number',
            dataOrigin: 'fetch',
            listURL: '/stores',
            value: 'id',
            text: 'name',
        }
    },
    store: {
        text: 'Tienda/Bodega',
        create: false,
        editable: false,
        type: 'object',
        objectKey: 'name',
    },
    movement_type_id: {
        text: 'Tipo Mov',
        create: true,
        editable: false,
        type: 'model',
        model: {
            type: 'number',
            dataOrigin: 'fetch',
            listURL: '/movementtypes',
            value: 'id',
            text: 'name',
        }
    },
    movement_code: {
        text: 'Cod Mov',
        create: false,
        editable: false,
        type: 'string'
    },
    qty: {
        text: 'Cant',
        create: true,
        editable: false,
        type: 'number'
    },
    total_db: {
        text: 'Total Debito',
        create: true,
        editable: false,
        type: 'string'
    },
    total_cr: {
        text: 'Total Credito',
        create: true,
        editable: false,
        type: 'string'
    },
    status: {
        text: 'Estado',
        create: false,
        editable: false,
        type: 'string'
    },
    date: {
        text: 'Fecha R',
        create: true,
        editable: false,
        type: 'date'
    },
    created_at: {
        text: 'Creacion',
        create: false,
        editable: false,
        type: 'string'
    },
}

</script>

<style lang="scss" scoped>

</style>