<template>
  <div>
    <section>
      <p class="title">セクション1 どの豆??</p>
      <div>
        <input
          type="radio"
          id="upperA"
          value="upperA"
          name="section1"
          v-model="pickedSection1"
        />
        <label for="upperA">A:概要(団体)</label>
        <input
          type="radio"
          id="upperC"
          value="upperC"
          name="section1"
          v-model="pickedSection1"
        />
        <label for="upperC">C:濃さ(団体)</label>
        <br />
        <input
          type="radio"
          id="lowerA"
          value="lowerA"
          name="section1"
          v-model="pickedSection1"
        />
        <label for="lowerA">a:概要(個人)</label>
        <input
          type="radio"
          id="lowerC"
          value="lowerC"
          name="section1"
          v-model="pickedSection1"
        />
        <label for="lowerC">c:濃さ(個人)</label>
      </div>
      <UpperA v-show="pickedSection1 == 'upperA'" :datas="datas" />
    </section>
    <hr />
    <section>
      <p class="title">セクション2 どうやって淹れる??</p>
      <div>
        <select v-model="pickedBeanSection2">
          <option v-for="bean in beans" v-bind:key="bean.id">
            {{ bean.name }}
          </option>
        </select>
        <input
          type="radio"
          id="upperB"
          value="upperB"
          name="section2"
          v-model="pickedSection2"
        />
        <label for="upperB">B:概要(個人)</label>
        <input
          type="radio"
          id="lowerB"
          value="lowerB"
          name="section2"
          v-model="pickedSection2"
        />
        <label for="lowerB">b:濃さ(個人)</label>
      </div>

      <div>{{ pickedBeanSection2 }}{{ pickedSection2 }}</div>
    </section>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();
export default {
  data() {
    return {
      beans: this.$beanNames,
      pickedSection1: "",
      pickedSection2: "",
      pickedBeanSection2: "",
    };
  },

  async asyncData() {
    let tmp = [];
    await db
      .collection("datas")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((data) => {
          tmp.push(data.data());
        });
      });
    return { datas: tmp };
  },
};
</script>

<style>
</style>