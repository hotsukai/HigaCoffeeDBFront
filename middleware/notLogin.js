export default function({ route, store, redirect }) {
  if (
    !store.state.currentUser &&
    !(
      route.name === "login" ||
      route.name === "index" ||
      route.name === "data" ||
      route.name === "reviews" ||
      route.name === "signup"
    )
  ) {
    alert("会員登録が必要です。");
    redirect("/signup");
  }
}
