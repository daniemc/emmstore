import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
export const useAuthStore = defineStore('Auth', {
    state: () => ({
        user: {},
        authenticated: false,
    }),
    getters: {
        token: () => {
            return JSON.parse(localStorage.getItem('token')) 
        },
    },
    actions: {
        async login(payload) {
            const { hasError, data } = await useApi(
                'POST',
                '/auth/login',
                payload
            )
            if (!hasError && data.success === true) {
                const token = data.token
                const user = data.user

                this.user = { ...user }
                
                localStorage.setItem('token', JSON.stringify(token))
                localStorage.setItem('user', JSON.stringify(user))

                this.authenticated = true
                return {
                    authenticated: true,
                }
            }
            return {
                authenticated: false,
            }
        },
        tokenStillValid() {
            const token = JSON.parse(localStorage.getItem('token'))
            if (token === null) return false
            const jwtDecoded = jwtDecode(token)
            const isExpired = dayjs.unix(jwtDecoded.exp).diff(dayjs()) < 1
            if (!isExpired) {
                this.authenticated = true
                this.user = JSON.parse(localStorage.getItem('user')) 
                return true
            }
            return false
            
        },
        async refreshToken() {
            const { hasError, data } = await useApi(
                'GET',
                '/authUser'
            )
            let authenticated = false
            if (!hasError && data.user.id) {
                authenticated = true
                this.authenticated = true
            }

            return {
                authenticated
            }
        },
        async logout() {
            const { hasError, data } = await useApi(
                'GET',
                '/logout'
            )
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            this.user = {}
            this.authenticated = false

            navigateTo('/login')
        }
    },
});
