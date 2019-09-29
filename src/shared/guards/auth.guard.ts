const exclude = ['/visitor/login']

function isHostPath(path) {
  return path.startsWith('/host')
}

function isExcludePath(path) {
  return exclude.indexOf(path) >= 0
}

export const authGuard = async ({ router, store }, { to, from, next }) => {
  let target

  if (isHostPath(to.fullPath) && !store.state.name) {
    store.commit('setHost')
  }

  if (
    !isHostPath(to.fullPath) &&
    !isExcludePath(to.fullPath) &&
    (!store.state.visitor || !store.state.visitor.username)
  ) {
    target = { name: 'login', params: { redirect: to.fullPath } }
  }

  next(target)
}
