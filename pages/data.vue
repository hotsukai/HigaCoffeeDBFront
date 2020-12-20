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
      <div v-if="getProvideDataPromise">
        <GraphA
          v-if="pickedSection1 == 'upperA'"
          :isMine="false"
          :propsDataPromise="getProvideDataPromise"
        />
        <div v-if="pickedSection1 == 'lowerA'">
          <div v-if="isLogin">
            <GraphA :isMine="true" :propsDataPromise="getProvideDataPromise" />
          </div>
          <div v-else>
            <p>
              個人グラフを見るには
              <nuxt-link to="/login"> ログイン </nuxt-link>
              が必要です。
            </p>
          </div>
        </div>
      </div>

      <GraphC
        v-if="pickedSection1 == 'upperC'"
        :getPositionDataPromise="getPositionDataPromise"
      />
      <div v-if="pickedSection1 == 'lowerC'">
        <div v-if="isLogin">
          <GraphC :getPositionDataPromise="getPositionDataPromise" />
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
        <select v-model="pickedBeanSection2" class="select">
          <option
            v-for="bean in beans"
            v-bind:key="bean.id"
            v-bind:value="bean.id"
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
      <div v-if="getStrongnessDataPromise">
        <GraphB
          v-if="pickedSection2 == 'upperB' && pickedBeanSection2 !== ''"
          :propsDataPromise="getStrongnessDataPromise"
          :isMine="false"
        />
        <div v-if="pickedSection2 == 'lowerB' && pickedBeanSection2 !== ''">
          <div v-if="isLogin">
            <GraphB
              :propsDataPromise="getStrongnessDataPromise"
              :isMine="true"
            />
          </div>
          <div v-else>
            <p>
              個人グラフを見るには
              <nuxt-link to="/login"> ログイン </nuxt-link>
              が必要です。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickedSection1: "upperA",
      pickedSection2: "upperB",
      pickedBeanSection2: 1,
      beans: {},
      getProvideDataPromise: null,
      getStrongnessDataPromise: null,
      getPositionDataPromise: null,
      isLogin: this.$store.state.currentUser
    };
  },
  async created() {
    this.beans = await this.$axios.$get("/beans").then(res => {
      if (res.result) return res.data;
    });
    this.getProvideDataPromise = this.$axios.$get("/data/provide").then(res => {
      if (res.result) return res.data;
    });
    this.getStrongnessDataPromise = this.$axios
      .$get("/data/strongness/" + this.pickedBeanSection2)
      .then(res => {
        if (res.result) return res.data;
      });
    this.getPositionDataPromise = this.$axios
      .$get("/data/bean_position")
      .then(res => {
        if (res.result) return res.data;
      });
  },
  watch: {
    pickedBeanSection2(val) {
      this.getStrongnessDataPromise = this.$axios
        .$get("/data/strongness/" + val)
        .then(res => {
          return res.data;
        });
    }
  }
};
</script>

<style></style>
