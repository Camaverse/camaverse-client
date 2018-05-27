export const dev = {
  namespaced: true,
  state: {
    loadImgs: false
  },
  getters: {
    loadImgs: state => state.loadImgs
  }
}
