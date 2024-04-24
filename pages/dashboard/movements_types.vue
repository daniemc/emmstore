<template>
    <div>
        <DataAdmin 
        :name="{
            singular: 'Movimiento',
            plural: 'Tipos de movimientos',
        }"
        :fields="fields"
        allow-create
        allow-edit
        allow-delete
        autoCrud
        :crud="{
            c: '/movementtypes',
            r: '/movementtypes',
            u: '/movementtypes',
            d: '/movementtypes',
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
    flow: {
        text: 'Flujo',
        create: false,
        editable: false,
        type: 'string'
    },
    description: {
        text: 'Descripción',
        create: true,
        editable: true,
        type: 'string'
    },
}
</script>

<style lang="scss" scoped>

</style>