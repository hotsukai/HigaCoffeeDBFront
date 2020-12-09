export default function({ route, store, redirect }) {
  if (
    !store.state.currentUser &&
    !(route.name === "login" || route.name === "index" || route.name === "data"||route.name === "reviews")
  ) {
    alert("ログインが必要です。");
    redirect("/login");
  }
}

