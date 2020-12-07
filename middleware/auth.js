export default async ({store}) => {
    if (!store.state.currentUser) {
        console.debug("middleware/auth")
      await store.dispatch('auth')
    }
  }