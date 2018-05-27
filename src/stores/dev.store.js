export const dev = {
  namespaced: true,
  state: {
    loadImgs: true
  },
  getters: {
    loadImgs: state => state.loadImgs
  }
}
