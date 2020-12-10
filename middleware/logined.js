export default function({ route, store, redirect }) {
    if (store.state.currentUser && route.name === "login") {
      redirect("/");
    }
  }
  