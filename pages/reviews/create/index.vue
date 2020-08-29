<template>
  <div>
    <h1 class="title">あなたあてのコーヒー</h1>
    <CoffeeCards :coffees="coffees" />
  </div>
</template>


<script>
import firebase from "@/plugins/firebase";
import { User } from "firebase";
const currentUser = firebase.auth().currentUser;

export default {
  async asyncData() {
    const db = firebase.firestore();
    const coffeesArray = [];
    console.debug(currentUser.uid)
    await db
      .where("user_id", "==", currentUser.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.debug(doc.id, " => ", doc.data());
          coffeesArray.push(doc.data());
        });
      });
    console.debug("coffeeArray", coffeesArray);
    return { coffees: coffeesArray };
  },

  data() {
    return {
      name: "",
      user_id: "",
      photoURL: "",
      coffees: [],
    };
  },
};
</script>

<style>
</style>