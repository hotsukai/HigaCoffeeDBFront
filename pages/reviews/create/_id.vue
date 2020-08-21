<template>
  <form>
    <p>id:{{$route.params.id}}のコーヒーについて</p>
    <div>
      <p>苦さについて</p>
      <p>焙煎度合は一旦忘れて、「あなたがどう感じたか」を記してください。</p>
      <label>酸っぱい</label>
      <input name="bitterness" v-model="bitterness" type="radio" value="1" checked="checked" />
      <input name="bitterness" v-model="bitterness" type="radio" value="2" />
      <input name="bitterness" v-model="bitterness" type="radio" value="3" />
      <input name="bitterness" v-model="bitterness" type="radio" value="4" />
      <label>苦い</label>
    </div>
    <div>
      <p>濃さについて</p>
      <p>抽出時間は一旦忘れて、「あなたがどう感じたか」を記してください。</p>
      <label>薄い</label>
      <input name="strongness" v-model="strongness" type="radio" value="1" checked="checked" />
      <input name="strongness" v-model="strongness" type="radio" value="2" />
      <input name="strongness" v-model="strongness" type="radio" value="3" />
      <input name="strongness" v-model="strongness" type="radio" value="4" />
      <label>濃い</label>
    </div>
    <div>
      <p>役割について</p>
      <p>「どういう時におすすめか」という観点で選んでください。</p>
      <label>リラックス</label>
      <input name="situation" v-model="situation" type="radio" value="1" checked="checked" />
      <input name="situation" v-model="situation" type="radio" value="2" />
      <input name="situation" v-model="situation" type="radio" value="3" />
      <input name="situation" v-model="situation" type="radio" value="4" />
      <label>眠気覚まし</label>
    </div>
    <div>
      <p>また飲みたい??</p>
      <p>ご遠慮なく！</p>
      <label>飲みたくない</label>
      <input name="repeat" v-model="repeat" type="radio" value="1" checked="checked" />
      <input name="repeat" v-model="repeat" type="radio" value="2" />
      <input name="repeat" v-model="repeat" type="radio" value="3" />
      <label>また飲みたい!!</label>
    </div>
    <div>
      <p>感想</p>
      <p>コーヒーについての感想を教えてください。また、既定のレシピ通りに出来なかった場合はその旨を記してください（例：お湯を入れすぎた、抽出時間長すぎた）</p>
      <input v-model="feeling" />
    </div>
    <!-- TODO: firebaseのロジック追加 -->
    <button @click="sendReview" v-bind:disabled="!isValid">送信!!</button>
    <!-- TODOどの誤りかを詳しく出力 -->
    <p v-show="!isValid" class="is-danger">入力に不備があります</p>
    <!-- <div>{{bitterness}},{{strongness}},{{situation}},{{repeat}},{{feeling}}</div> -->
  </form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "../../../plugins/firebase";
var db = firebase.firestore();
@Component
export default class ReviewForm extends Vue {
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
    );
  }

  async sendReview() {
    console.log("DUBUG");
    if (this.user !== null) {
      await db
        .collection("reviews")
        .doc(this.$route.params.id)
        .set({
          bitterness: this.bitterness,
          strongness: this.strongness,
          situation: this.situation,
          repeat: this.repeat,
          feeling: this.feeling,
          user_id: this.user.uid,
          coffee_id: this.$route.params.id,
        })
        .then(async (docRef) => {
          if (this.user !== null) {
            //TODO: ユーザー情報にレビューを追加する(動かない。)
            await db
              .collection("users")
              .doc(this.user.uid)
              .update({
                reviews: firebase.firestore.FieldValue.arrayUnion(this.$route.params.id),
              });
            console.log("ユーザー情報にレビューを追加しました。", docRef);
          } else {
            alert("ERROR2:ログインしてください");
          }
          console.log("レビューを投稿しました");
          this.$router.push({ path: "mypage" });
          console.log("router pushed");
        })
        .catch((error: any) => {
          console.error("Error adding document: ", error);
        });
      console.log("DUBUG2");
    } else {
      alert("ERROR1:ログインしてください");
    }
    console.log("DUBUG3");
  }
}
//TODO:すでにこのコーヒーにレビューがある場合エラーを吐く。
// レビュー投稿のalertが作動しない
// TODO: 投稿後に?bitterness=2&strongness=4&situation=1&repeat=3みたいなとこに推移してしまう。ログイン情報がなくなる
//TODO: このコーヒーのレビューを書く権利があるかを取得
</script>

<style >
</style>