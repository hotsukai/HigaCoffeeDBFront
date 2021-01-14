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
          key="mine-A-graph"
          :is-mine="true"
          :props-data-promise="getProvideDataPromise"
        />
        <!-- TODO:縮尺を揃える -->
        <GraphA
          v-else-if="!section1_1IsPersonal"
          key="everyone-A-graph"
          :is-mine="false"
          :props-data-promise="getProvideDataPromise"
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
          key="mine-C-graph"
          :is-mine="true"
          :get-position-data-promise="getPositionDataPromise"
        />
        <GraphC
          v-else-if="!section1_2IsPersonal"
          key="everyone-C-graph"
          :is-mine="false"
          :get-position-data-promise="getPositionDataPromise"
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
          <option v-for="bean in beans" :key="bean.id" :value="bean.id">
            {{ bean.fullName }}
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
          key="mine-B-graph"
          :props-data-promise="getStrongnessDataPromise"
          :is-mine="true"
        />
        <GraphB
          v-else-if="!section2IsPersonal"
          key="everyone-B-graph"
          :props-data-promise="getStrongnessDataPromise"
          :is-mine="false"
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

<script lang="ts">
import { Bean } from "~/types/models";
import Vue from "vue";
export default Vue.extend({
  data(): {
    pickedBeanSection2: number;
    beans: Bean | null;
    getProvideDataPromise: Promise<any> | null;
    getStrongnessDataPromise: Promise<any> | null;
    getPositionDataPromise: Promise<any> | null;
    isLogin: boolean;
    section1_1IsPersonal: boolean;
    section1_2IsPersonal: boolean;
    section2IsPersonal: boolean;
  } {
    return {
      pickedBeanSection2: 1,
      beans: null,
      getProvideDataPromise: null,
      getStrongnessDataPromise: null,
      getPositionDataPromise: null,
      isLogin: this.$store.state.currentUser,
      section1_1IsPersonal: false,
      section1_2IsPersonal: false,
      section2IsPersonal: false,
    };
  },
  watch: {
    pickedBeanSection2(val: number): void {
      this.getStrongnessDataPromise = this.$axios
        .$get("/data/strongness/" + val)
        .then((res: any) => {
          return res.data;
        })
        .catch((e) => {
          this.$toast.error("エラーが発生しました。" + e.response.message);
          console.error(
            "エラーが発生しました。" + JSON.stringify(e.response, null, 2)
          );
          this.$router.push("/");
        });
    },
  },
  async created(): Promise<any> {
    this.beans = await this.$axios
      .$get("/beans")
      .then((res: { result: boolean; data: any }) => {
        if (res.result) return res.data;
      })
      .catch((e: { response: { message: string } }) => {
        this.$toast.error("エラーが発生しました。" + e.response.message);
        console.error(
          "エラーが発生しました。" + JSON.stringify(e.response, null, 2)
        );
        this.$router.push("/");
      });
    this.getProvideDataPromise = this.$axios
      .$get("/data/provide")
      .then((res: { result: boolean; data: any }) => {
        if (res.result) return res.data;
      })
      .catch((e: { response: { message: string } }) => {
        this.$toast.error("エラーが発生しました。" + e.response.message);
        console.error(
          "エラーが発生しました。" + JSON.stringify(e.response, null, 2)
        );
        this.$router.push("/");
      });
    this.getStrongnessDataPromise = this.$axios
      .$get("/data/strongness/" + this.pickedBeanSection2)
      .then((res: { result: boolean; data: any }) => {
        if (res.result) return res.data;
      })
      .catch((e: { response: { message: string } }) => {
        this.$toast.error("エラーが発生しました。" + e.response.message);
        console.error(
          "エラーが発生しました。" + JSON.stringify(e.response, null, 2)
        );
        this.$router.push("/");
      });
    this.getPositionDataPromise = this.$axios
      .$get("/data/bean_position")
      .then((res: { result: boolean; data: any }) => {
        if (res.result) return res.data;
      })
      .catch((e: { response: { message: string } }) => {
        this.$toast.error("エラーが発生しました。" + e.response.message);
        console.error(
          "エラーが発生しました。" + JSON.stringify(e.response, null, 2)
        );
        this.$router.push("/");
      });
  },
});
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
