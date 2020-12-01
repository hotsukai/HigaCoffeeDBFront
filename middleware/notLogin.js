export default function({ route, store, redirect }) {
  if (
    !store.state.currentUser &&
    !(route.name === "login" || route.name === "index" || route.name === "data")
  ) {
    alert("ログインが必要です。");
    redirect("/login");
  }
}

