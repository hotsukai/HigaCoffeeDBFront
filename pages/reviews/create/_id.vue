<template>
  <form>
    <p>id:{{$route.params.id}}のコーヒーについて</p>
    <div>
      <p>苦さについて</p>
      <p>焙煎度合は一旦忘れて、「あなたがどう感じたか」を記してください。</p>
      <label>酸っぱい</label>
      <input name="bitterness" v-model.number="bitterness" type="radio" value="1" />
      <input name="bitterness" v-model.number="bitterness" type="radio" value="2" />
      <input name="bitterness" v-model.number="bitterness" type="radio" value="3" />
      <input name="bitterness" v-model.number="bitterness" type="radio" value="4" />
      <label>苦い</label>
    </div>
    <div>
      <p>濃さについて</p>
      <p>抽出時間は一旦忘れて、「あなたがどう感じたか」を記してください。</p>
      <label>薄い</label>
      <input name="strongness" v-model.number="strongness" type="radio" value="1" />
      <input name="strongness" v-model.number="strongness" type="radio" value="2" />
      <input name="strongness" v-model.number="strongness" type="radio" value="3" />
      <input name="strongness" v-model.number="strongness" type="radio" value="4" />
      <label>濃い</label>
    </div>
    <div>
      <p>役割について</p>
      <p>「どういう時におすすめか」という観点で選んでください。</p>
      <label>リラックス</label>
      <input name="situation" v-model.number="situation" type="radio" value="1" />
      <input name="situation" v-model.number="situation" type="radio" value="2" />
      <input name="situation" v-model.number="situation" type="radio" value="3" />
      <input name="situation" v-model.number="situation" type="radio" value="4" />
      <label>眠気覚まし</label>
    </div>
    <div>
      <p>また飲みたい??</p>
      <p>ご遠慮なく！</p>
      <label>飲みたくない</label>
      <input name="repeat" v-model.number="repeat" type="radio" value="1" />
      <input name="repeat" v-model.number="repeat" type="radio" value="2" />
      <input name="repeat" v-model.number="repeat" type="radio" value="3" />
      <label>また飲みたい!!</label>
    </div>
    <div>
      <p>感想</p>
      <p>コーヒーについての感想を教えてください。また、既定のレシピ通りに出来なかった場合はその旨を記してください（例：お湯を入れすぎた、抽出時間長すぎた）</p>
      <input v-model="feeling" />
    </div>
    <button @click="sendReview" v-bind:disabled="!isValid">送信!!</button>
    <!-- TODO:どの誤りかを詳しく出力 -->
    <p v-show="!isValid" class="is-danger">入力に不備があります</p>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "../../../plugins/firebase";
var db = firebase.firestore();
@Component
export default class ReviewForm extends Vue {
  // TODO:数字になってない
  bitterness: number = -1;
  strongness: number = -1;
  situation: number = -1;
  repeat: number = -1;
  feeling: string = "";
  user = firebase.auth().currentUser; //TODO: リロードすると得られない。

  get isValid(): boolean {
    return (
      this.bitterness !== -1 &&
      this.strongness !== -1 &&
      this.situation !== -1 &&
      this.repeat !== -1
      // true
    );
  }

  addCoffeeIdToUser() {
    console.debug("addCoffeeIdToUserに入りました");
    if (this.user !== null) {
      db.collection("users")
        .doc(this.user.uid)
        .update({
          reviews: firebase.firestore.FieldValue.arrayUnion(
            parseInt(this.$route.params.id)
          ),
        });
      console.debug(
        "ユーザー情報にレビューを追加しました。",
        this.$route.params.id
      );
    } else {
      alert("ERROR2:ログインしてください");
    }
  }

  goRoot() {
    this.$router.push({ path: "/", params: {} });
    console.debug("ルーターにRootをPushしました", this.$router);
  }

  addReview() {
    if (this.user !== null) {
      db.collection("reviews")
        .doc(this.$route.params.id)
        .set({
          bitterness: this.bitterness,
          strongness: this.strongness,
          situation: this.situation,
          repeat: this.repeat,
          feeling: this.feeling,
          user_id: this.user.uid,
          coffee_id: parseInt(this.$route.params.id),
        })
        .then(() => {
          console.debug("レビューを投稿しました");
        })
        .catch((error: any) => {
          console.error("Error adding document: ", error);
        });
    } else {
      alert("ERROR1:ログインしてください");
      this.$router.push("login");
    }
  }

  async sendReview() {
    console.debug("sendReviewに入りました", this.$route.params.id);
    await this.addReview();
    await this.addCoffeeIdToUser();
    await this.goRoot(); //TODO:ページ遷移しない
  }
}
//TODO:すでにこのコーヒーにレビューがある場合エラーを吐く。
// TODO: 投稿後に?bitterness=2&strongness=4&situation=1&repeat=3みたいなパラメータがつく..?
//TODO: このコーヒーのレビューを書く権利があるかを取得
</script>

<style >
</style>