export default function({ route, store, redirect ,$toast}) {
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
    $toast.show("ログインが必要です。");
    redirect("/signup");
  }
}
