import firebase from '@/plugins/firebase'

const middleware = ({
  route,
  store,
  redirect
}) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user &&
      !(route.name === 'login' || route.name === 'index' || route.name === 'data')) {
      redirect('/login')
      console.debug("redirected <need login>",route.name)
    }
  })
}
export default middleware
