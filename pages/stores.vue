<template>
    <div>
        <DataAdmin 
        :name="{
            singular: 'Tienda',
            plural: 'Tiendas',
        }"
        :fields="fields"
        allow-create
        allow-edit
        allow-delete
        autoCrud
        :crud="{
            c: '/stores',
            r: '/stores',
            u: '/stores',
            d: '/stores',
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
    description: {
        text: 'Descripción',
        create: true,
        editable: true,
        type: 'string'
    },
    active: {
        text: 'Activa',
        create: true,
        editable: true,
        type: 'boolean'
    },
}
</script>

<style lang="scss" scoped>

</style>