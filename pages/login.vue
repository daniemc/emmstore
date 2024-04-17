<template>
    <div class="relative flex flex-col justify-center h-screen overflow-hidden">
        <div class="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                <div>
                    <label class="label">
                        <span class="text-base label-text">Correo Electrónico</span>
                    </label>
                    <input 
                    type="text" 
                    placeholder="Correo Electrónico" 
                    class="w-full input input-bordered input-primary" 
                    v-model="form.email"
                    />
                    <span 
                    v-if="formErrors.email"
                    class="text-red-400 text-sm" >{{ formErrors.email }}</span>
                </div>
                <div>
                    <label class="label">
                        <span class="text-base label-text">Contraseña</span>
                    </label>
                    <input 
                    type="password" 
                    placeholder="Ingrese su contraseña"
                    class="w-full input input-bordered input-primary" 
                    v-model="form.password"
                    />
                    <span 
                    v-if="formErrors.password"
                    class="text-red-400 text-sm" >{{ formErrors.password }}</span>
                </div>
                <!-- <a href="#" class="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a> -->
                <div class="mt-4">
                    <button 
                        class="btn btn-primary"
                        @click="login"    
                    >Iniciar Sesion</button>
                </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'default',
})

const AuthStore = useAuthStore()

const form = reactive({
    email: '',
    password: '',
})

const formErrors = reactive({
    email: null,
    password: null,
})

async function login() {
    formErrors.email = null
    formErrors.password = null

    let errors = false
    if (form.email.trim() === '') {
        formErrors.email = 'Debe ingresar un usuario válido'
        errors = true
    }
    if (form.password.trim() === '') {
        formErrors.password = 'Debe ingresar una contraseña'
        errors = true
    }
    if (errors) return
    const { authenticated } = await AuthStore.login(form)
    if (authenticated) navigateTo('/')
}

</script>

<style lang="scss" scoped>

</style>