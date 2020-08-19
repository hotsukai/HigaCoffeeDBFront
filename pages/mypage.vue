<template>
  <p>お名前:{{user_name}}</p>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "../plugins/firebase";
import { User } from "firebase";
@Component({})
export default class MypagePage extends Vue {
  private name: string | null = "初期の名前";

  public get user_name(): string | null {
    return this.name;
  }
  created() {
    const user: User | null = firebase.auth().currentUser;
    if (user != null) {
      this.name = user.displayName;
      console.log(user.displayName);
    }
  }
}
</script>

<style>
</style>