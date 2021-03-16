<template>
  <div>
    <div id="bg1" class="parallax-bg overlay">
      <h1 class="title is-size-1-mobile">Higa = 彼我</h1>
    </div>
    <div id="bg2" class="parallax-bg">
      <div class="section">
        <div class="columns">
          <div class="column">
            <p>
              データでコーヒーはもっと楽しめる。<br />
              みんなのデータを使ったらもっともっと楽しめる。
            </p>

            <p>
              Higa Coffee データベースは <br />
              "いつどんな目的で飲んだのか",<br />
              "どんな印象を持ったのか"<br />
              を記録し、データをもとに一人ひとりにぴったりなコーヒーを見つけるお手伝いをします。
            </p>

            <p>あなたのぴったりを見つけよう</p>
            <button
              type="button"
              class="button"
              @click="$router.push('/signup')"
            >
              サインアップ
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="bg3" class="parallax-bg">
      <div class="section">
        <div class="columns">
          <div class="column">
            <h2>What's Higa Coffee?</h2>
            <p>
              コミュニケーションを大切にしながらコーヒーを楽しみたい。<br />
              そんな思いを込めて、Higa Coffeeと名付けました。
            </p>
            <p>
              「どんなコーヒーが好きか」というのは極めて個人的な問題ですが、<br />
              私たちはこの問題を仲間と一緒に考えることを大切にしています。
            </p>
            <p>
              〈あなた とわたし〉の違い、つまり〈彼我〉の差を手掛かりにして<br />
              それぞれが ”自分好みのコーヒー” を探しているのです。
            </p>

            <p>
              2019年に生まれ、2020年になんとか自立した小さな団体です。少しでもご関心をお持ちの方はお気軽にご連絡ください。あなたの参加を心よりお待ちしております。
            </p>
            <a href="https://sites.google.com/view/higa-coffee/top"
              ><p>HiGa Coffeeをもっと知る>></p></a
            >

            <p>あなたのぴったりを見つけよう</p>
            <button
              type="button"
              class="button"
              @click="$router.push('/signup')"
            >
              サインアップ
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="section what-is-this">
      <div class="columns">
        <div class="column">
          <p class="sub-title data">みる</p>
          <p>
            どんなコーヒーがあなたにぴったり?<br />"みる"ではみんなのコーヒーのデータをグラフで見ることができます。あなたはどんなコーヒーをどうやって淹れることにしますか?
          </p>
        </div>

        <div class="column">
          <p class="sub-title reviews">よむ</p>
          <p>
            みんなはコーヒーどう思ってるの?<br />"よむ"ではみんなのコーヒーのレビューを読むことができます。みんなのレビューからあなたの好みの傾向を探りましょう。
          </p>
        </div>

        <div class="column">
          <p class="sub-title reviews-create">かく</p>
          <p>
            あなたのぴったりの記録をつけましょう!<br />"かく"ではコーヒーの味わいを記録することができます。
          </p>
        </div>

        <div class="column">
          <p class="sub-title coffees-create">いれる</p>
          <p>なんとなくいれるじゃもったいない!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  layout: "toppage",
});
</script>

<style lang="scss" scoped>
#bg1 {
  background-image: url("/images/coffee3.jpg");
  min-height: 100vh;
  &::after {
    content: "";
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
  }
  .title {
    font-size: 5rem;
    color: $white;
    position: relative;
    z-index: 1;
  }
}
#bg2 {
  background-image: url("/images/coffee2.jpg");
  min-height: 60vh;
  position: relative;
  &::after {
    content: "";
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
  }
  p {
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
  }
  button {
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
  }
}
#bg3 {
  background-image: url("/images/coffee4.jpg");
  p {
    margin-bottom: 2rem;
  }
}

.parallax-bg {
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5%;
}

.what-is-this {
  .sub-title {
    font-size: 1.3rem;
  }
  .column {
    font-size: 0.7rem;
  }
  .data::before {
    font-family: "Font Awesome 5 Free";
    margin-right: 0.3em;
    font-weight: 900;
    content: "\f080";
  }

  .reviews::before {
    font-family: "Font Awesome 5 Free";
    margin-right: 0.3em;
    font-weight: 900;
    content: "\f518";
  }

  .reviews-create::before {
    font-family: "Font Awesome 5 Free";
    margin-right: 0.3em;
    font-weight: 900;
    content: "\f304";
  }

  .coffees-create::before {
    font-family: "Font Awesome 5 Free";
    margin-right: 0.3em;
    font-weight: 900;
    content: "\f253";
  }
}
</style>