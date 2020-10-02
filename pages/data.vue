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
      <GraphA v-if="pickedSection1 == 'upperA'" :datas="allDatas" />
      <div v-if="pickedSection1 == 'lowerA'">
        <div v-if="isLogin">
          <GraphA :datas="myDatas" />
        </div>
        <div v-else>
          <p>
            個人グラフを見るには
            <nuxt-link to="/login"> ログイン </nuxt-link>
            が必要です。
          </p>
        </div>
      </div>
      <GraphC v-if="pickedSection1 == 'upperC'" :receivedDatas="allDatas" />
      <div v-if="pickedSection1 == 'lowerC'">
        <div v-if="isLogin">
          <GraphC :receivedDatas="myDatas" />
        </div>
        <div v-else>
          <p>
            個人グラフを見るには
            <nuxt-link to="/login"> ログイン </nuxt-link>
            が必要です。
          </p>
        </div>
      </div>
    </section>
    <hr />
    <section>
      <p class="title">セクション2 どうやって淹れる??</p>
      <div>
        <select v-model="pickedBeanSection2">
          <option
            v-for="(bean, index) in beans"
            v-bind:key="bean.id"
            v-bind:value="index"
          >
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
        <label for="upperB">B:濃度(全体)</label>
        <input
          type="radio"
          id="lowerB"
          value="lowerB"
          name="section2"
          v-model="pickedSection2"
        />
        <label for="lowerB">b:濃度(個人)</label>
      </div>

      <div>{{ pickedBeanSection2 }}{{ pickedSection2 }}</div>
      <GraphB
        v-if="pickedSection2 == 'upperB' && pickedBeanSection2 !== ''"
        :receivedData="allDatas[pickedBeanSection2]"
      />
      <div v-if="pickedSection2 == 'lowerB' && pickedBeanSection2 !== ''">
        <div v-if="isLogin">
          <GraphB :receivedData="myDatas[pickedBeanSection2]" />
        </div>
        <div v-else>
          <p>
            個人グラフを見るには
            <nuxt-link to="/login"> ログイン </nuxt-link>
            が必要です。
          </p>
        </div>
      </div>
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
    let allDatas = [];
    await db
      .collection("datas")
      .doc("all")
      .collection("datas")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((data) => {
          allDatas.push(data.data());
        });
      });
    if (firebase.auth().currentUser !== null) {
      let myDatas = [];
      await db
        .collection("datas")
        .doc(firebase.auth().currentUser.uid)
        .collection("datas")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((data) => {
            myDatas.push(data.data());
          });
        });
      return { allDatas: allDatas, myDatas: myDatas, isLogin: true };
    } else {
      return { allDatas: allDatas, isLogin: false };
    }
  },
};
</script>

<style>
</style>