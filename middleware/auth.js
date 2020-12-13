export default async ({store}) => {
    if (!store.state.currentUser) {
      await store.dispatch('auth')
    }
  }