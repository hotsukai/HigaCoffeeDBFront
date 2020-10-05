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
    }
  })
}
export default middleware
