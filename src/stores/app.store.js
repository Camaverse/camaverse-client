import Vue from 'vue'

export const appStore = {
    namespaced: true,
    state: {
        showSplash: false
    },
    mutations: {
        hideSplash: state => {
            Vue.set(state, 'showSplash', false)
        }
    }
}