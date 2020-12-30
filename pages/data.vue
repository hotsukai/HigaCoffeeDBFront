<template>
  <div>
    <section>
      <p class="title">セクション1 どの豆??</p>
      <toggle-button
        v-model="section1_1IsPersonal"
        :value="false"
        :width="70"
        :height="30"
        :labels="{ checked: 'わたし', unchecked: 'みんな' }"
      />
      <div v-if="getProvideDataPromise">
        <GraphA
          v-if="section1_1IsPersonal && isLogin"
          :isMine="true"
          :propsDataPromise="getProvideDataPromise"
          key="mine-A-graph"
        />
        <!-- TODO:縮尺を揃える -->
        <GraphA
          v-else-if="!section1_1IsPersonal"
          :isMine="false"
          :propsDataPromise="getProvideDataPromise"
          key="everyone-A-graph"
        />

        <div v-else class="require-login-message-area">
          <p>
            個人グラフを見るには
            <nuxt-link to="/login"> ログイン </nuxt-link>
            が必要です。
          </p>
        </div>
      </div>
    </section>
    <section>
      <toggle-button
        v-model="section1_2IsPersonal"
        :value="false"
        :width="70"
        :height="30"
        :labels="{ checked: 'わたし', unchecked: 'みんな' }"
      />
      <div v-if="getProvideDataPromise">
        <GraphC
          v-if="section1_2IsPersonal && isLogin"
          :isMine="true"
          :getPositionDataPromise="getPositionDataPromise"
          key="mine-C-graph"
        />
        <GraphC
          v-else-if="!section1_2IsPersonal"
          :isMine="false"
          :getPositionDataPromise="getPositionDataPromise"
          key="everyone-C-graph"
        />
        <div v-else class="require-login-message-area">
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
        <toggle-button
          v-model="section2IsPersonal"
          :value="false"
          :width="70"
          :height="30"
          :labels="{ checked: 'わたし', unchecked: 'みんな' }"
        />
      </div>
      <div v-if="getStrongnessDataPromise">
        <GraphB
          v-if="section2IsPersonal && isLogin"
          :propsDataPromise="getStrongnessDataPromise"
          :isMine="true"
          key="mine-B-graph"
        />
        <GraphB
          v-else-if="!section2IsPersonal"
          :propsDataPromise="getStrongnessDataPromise"
          :isMine="false"
          key="everyone-B-graph"
        />
        <div v-else class="require-login-message-area">
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
export default {
  data() {
    return {
      pickedBeanSection2: 1,
      beans: {},
      getProvideDataPromise: null,
      getStrongnessDataPromise: null,
      getPositionDataPromise: null,
      isLogin: this.$store.state.currentUser,
      section1_1IsPersonal: false,
      section1_2IsPersonal: false,
      section2IsPersonal: false,
    };
  },
  async created() {
    this.beans = await this.$axios.$get("/beans").then((res) => {
      if (res.result) return res.data;
    });
    this.getProvideDataPromise = this.$axios
      .$get("/data/provide")
      .then((res) => {
        if (res.result) return res.data;
      });
    this.getStrongnessDataPromise = this.$axios
      .$get("/data/strongness/" + this.pickedBeanSection2)
      .then((res) => {
        if (res.result) return res.data;
      });
    this.getPositionDataPromise = this.$axios
      .$get("/data/bean_position")
      .then((res) => {
        if (res.result) return res.data;
      });
  },
  watch: {
    pickedBeanSection2(val) {
      this.getStrongnessDataPromise = this.$axios
        .$get("/data/strongness/" + val)
        .then((res) => {
          return res.data;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.require-login-message-area {
  height: 400px;
  display: table;
  p {
    display: table-cell;
    vertical-align: middle;
  }
}
</style>
