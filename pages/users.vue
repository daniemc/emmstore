<template>
    <div>
        <DataAdmin 
        :name="{
            singular: 'Usuario',
            plural: 'Usuarios',
        }"
        :fields="fields"
        allow-create
        allow-edit
        allow-delete
        autoCrud
        :crud="{
            c: '/users',
            r: '/users',
            u: '/user',
            d: '/user',
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
    locked: {
        text: 'Bloqueado',
        create: false,
        editable: true,
        type: 'boolean'
    },
    login_attempts: {
        text: 'Intentos Login',
        create: false,
        editable: false,
        type: 'string'
    },
}
</script>

<style lang="scss" scoped>

</style>