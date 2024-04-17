export const useAppStore = defineStore('App', {
    state: () => ({
        loading: 0,
    }),
    getters: {
        isLoading: (state) => state.loading > 0,
    },
    actions: {
        setLoading(value) {
            if (this.loading === 0 && value === -1) return
            this.loading =  this.loading + value
        },
        stopLoading() {
            this.loading = 0
        },
    },
});
