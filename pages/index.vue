<template>
  <div>
    <div id="bg1" class="parallax-bg overlay">
      <div class="section">
        <h1 class="title is-size-mobile is-size-2-mobile">Higa = 彼我</h1>
        <div class="columns">
          <div class="column">
            <p class="poem">
              データでコーヒーはもっと楽しめる。
              <br />みんなのデータを使ったらもっともっと楽しめる。
            </p>

            <p class="poem">
              Higa Coffee データベースは
              "いつどんな目的で飲んだのか",
              "どんな印象を持ったのか"
              を記録し、データをもとに一人ひとりにぴったりなコーヒーを見つけるお手伝いをします。
            </p>

            <p class="poem">あなたのぴったりを見つけよう</p>
            <button type="button" class="button" @click="$router.push('/signup')">サインアップ</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="section what-is-this">
        <div class="columns">
          <div class="column">
            <p class="sub-title data">みる</p>
            <p>
              どんなコーヒーがあなたにぴったり?
              <br />"みる"ではみんなのコーヒーのデータをグラフで見ることができます。あなたはどんなコーヒーをどうやって淹れることにしますか?
            </p>
          </div>

          <div class="column">
            <p class="sub-title reviews">よむ</p>
            <p>
              みんなはコーヒーどう思ってるの?
              <br />"よむ"ではみんなのコーヒーのレビューを読むことができます。みんなのレビューからあなたの好みの傾向を探りましょう。
            </p>
          </div>

          <div class="column">
            <p class="sub-title reviews-create">かく</p>
            <p>
              のんだコーヒーの記録をつけましょう!
              <br />"かく"ではコーヒーの味わいを記録することができます。その記録があなたや誰かのぴったり探しの助けになるかもしれません。
            </p>
          </div>

          <div class="column">
            <p class="sub-title coffees-create">いれる</p>
            <p>
              なんとなくいれるじゃもったいない!
              <br />※現在、HigaCoffeeメンバーのみの提供になっております。
            </p>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="columns">
          <div class="column">
            <img src="/images/coffee3.jpg" />
          </div>
          <div class="column">
            <h2 class="is-size-3 poem">Higa Coffee とは??</h2>
            <p class="poem">
              コミュニケーションを大切にしながらコーヒーを楽しみたい。
              そんな思いを込めて、Higa Coffeeと名付けました。
            </p>

            <p class="poem">
              〈あなたとわたし〉
              <br />の違い、つまり
              <br />〈彼我〉
              <br />の差を手掛かりにして
              それぞれが "自分好みのコーヒー" を探しているのです。
            </p>

            <p
              class="poem"
            >2019年に生まれ、2020年になんとか自立した小さな団体です。少しでもご関心をお持ちの方はお気軽にご連絡ください。あなたの参加を心よりお待ちしております。</p>
            <a href="https://sites.google.com/view/higa-coffee/top">
              <p>HiGa Coffeeをもっと知る>></p>
            </a>
          </div>
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
.parallax-bg {
  &#bg1 {
    background-image: url("/images/coffee1.jpg");
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
    div {
      z-index: 1;
      position: relative;
    }
    .title {
      font-size: 5rem;
      margin-bottom: 2rem;
      color: $white;
    }
    p {
      margin-bottom: 2rem;
    }
  }

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
.section {
  padding: 5rem 2rem 0 2rem;
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
.poem {
  margin-bottom: 1rem;
}
</style>