export default defineNuxtRouteMiddleware(async (to, from) => {
    const AuthStore = useAuthStore()
    if (!AuthStore.authenticated) {
        const tokenValid = AuthStore.tokenStillValid()
        if (!tokenValid) {
            return navigateTo('/login')            
        }
    }

    const canContinue = validateRoutePermissions(to)
    if (!canContinue) {
        return navigateTo({
            path: '/unauthorized',
            query: {
                pathTo: to.path
            }
        })
    }
})

const validateRoutePermissions = (routeTo) => {
    const AuthStore = useAuthStore()
    let hasPermission = true
    
    const pageRoles = routeTo.meta.roles
    if (!pageRoles) return hasPermission
    
    const pageRolesToValidate = typeof pageRoles === 'string'
        ? [pageRoles]
        : pageRoles

    hasPermission = pageRolesToValidate.some(
        (pageRole) => 
            AuthStore.userRoles.includes(pageRole)
    )

    return hasPermission
}