import { Middleware } from '@nuxt/types'
import firebase from '../plugins/firebase'

const middleware: Middleware = ({ route, store, redirect }) => {
   firebase.auth().onAuthStateChanged((user) => {
        if (!user && route.name !== 'login') redirect('/login')
    })
}
export default middleware