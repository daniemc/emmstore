export default defineNuxtRouteMiddleware(async (to, from) => {
    const AuthStore = useAuthStore()
    if (!AuthStore.authenticated) {
        const tokenValid = AuthStore.tokenStillValid()
        if (!tokenValid) {
            navigateTo('/login')
        }
    }
})