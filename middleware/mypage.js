export default function ({ route, store, redirect }) {
  if (route.name === "mypage") {
    redirect("/users/" + store.state.currentUser.id);
  }
}
