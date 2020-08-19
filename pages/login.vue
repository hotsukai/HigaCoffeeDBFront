<template>
  <div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="メールアドレス" v-model="mail" />
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="パスワード" v-model="pass" />
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-success" @click="login">ログイン</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { auth } from "../plugins/firebase";
@Component({
  layout: "default",
  components: {},
})
export default class LoginPage extends Vue {
  mail: string = "";
  pass: string = "";

  login() {
    auth
      .signInWithEmailAndPassword(this.mail, this.pass)
      .then((user) => this.$router.push("/"))
      .catch((e) => alert(e.message));
  }
}
</script>