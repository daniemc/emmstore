export const useApi = async (
    method,
    url,
    payload = {},
    apiOptions = {
        showLoading: true
    }
) => {
    const AppStore = useAppStore()
    const AuthStore = useAuthStore()
    const config = useRuntimeConfig()

    const state = reactive({
        isLoading: false,
        hasError: false,
        errorMessage: '',
        data: null,
        statusCode: 0,
    })

    const setLoading = (value) => {
        if (!apiOptions.showLoading) return false
        state.isLoading = value
        AppStore.setLoading(value)
    }

    const needsVerifyToken = (url) => {
        const urlsExcluded = [
            '/login',
            '/refresh'
        ]

        if (urlsExcluded.includes(url)) {
            return false
        }
        return true
    }

    const fetchData = async () => {
        setLoading(1)
        
        const baseURL = config.public.apiBase
        try {      
            await $fetch(url, {
                baseURL,
                retry: 0,
                method,
                initialCache: false,
                key: `k-${method}-${url}-${Date.now()}-${JSON.stringify(payload)}`,
                onRequest({ request, options }) {
                    const optionsHeaders = options.headers || {}
                    options.headers = {
                        ...optionsHeaders,
                        'Accept-Language': AppStore.lang,
                        ...apiOptions.headers,
                    }
    
                    if (method === 'POST' || method === 'PUT') {
                        options.body = payload
                    }

                    if (AuthStore.authenticated) {   
                        options.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`                       
                    }
                },
                onRequestError({ request, options, error }) {
                    state.hasError = true
                    state.errorMessage = error
                    // notify({
                    //     title: `Error (Req)`,
                    //     text: error,
                    //     type: "error",
                    //     group: "default",
                    // }, 15000)
                },
                onResponse({ request, response, options }) {
                    state.data = response._data
                },
                onResponseError({ request, response, options }) {
                    state.hasError = true
                    const {
                        detail = '',
                        message = '',
                    } = response._data
                    if (response.status !== 401) {
                        let extraDetail = ''
                        // extraDetail = Object.keys(response._data)
                        //     .filter((key) => key !== 'detail')
                        //     .filter((key) => key !== 'message')
                        //     ?.map((key) => `<b>${key}:</b> ${response._data[key].map((_) => `${_}<br/>`)}`)
                        // notify({
                        //     title: `Error (${response.status}) ${message}`,
                        //     text: `${response.statusText} ${detail} <br/> ${extraDetail}`,
                        //     type: "error",
                        //     group: "default",
                        // }, 15000)
                    }

                    if (needsVerifyToken(url) && response.status === 401) {
                        AuthStore.clientLogout()
                    }
                    state.errorMessage = response.error
                    return false
                }
            })
            setLoading(-1)
            return
        } catch (error) {
            console.log({error})
            setLoading(-1)
            return 
        }
        
    }

    await fetchData()

    return {
        ...state
    }
}