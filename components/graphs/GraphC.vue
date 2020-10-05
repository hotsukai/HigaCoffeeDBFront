<script>
import { Bubble } from "vue-chartjs";

export default {
  extends: Bubble,
  props: ["receivedDatas"],

  data() {
    return {
      data: {
        labels: this.$beanNames,
        datasets: [
          {
            label: "ブラジル中煎り",
            data: [{ x: 0, y: 0, r: 7 }],
            backgroundColor: "rgba(100, 10, 10,0.5)",
          },
          {
            label: "ブラジル深煎り",
            data: [{ x: 0, y: 0, r: 7 }],

            backgroundColor: "rgba(100, 10, 10,1)",
          },
          {
            label: "コロンビア中煎り",
            data: [{ x: 0, y: 0, r: 7 }],

            backgroundColor: "rgba(10, 100, 10,0.5)",
          },
          {
            label: "コロンビア深煎り",
            data: [{ x: 0, y: 0, r: 7 }],

            backgroundColor: "rgba(10, 100, 10,1)",
          },
          {
            label: "タンザニア中煎り",
            data: [{ x: 0, y: 0, r: 7 }],

            backgroundColor: "rgba(10, 10, 100,0.5)",
          },
          {
            label: "タンザニア深煎り",
            data: [{ x: 0, y: 0, r: 7 }],

            backgroundColor: "rgba(10, 10, 100,1)",
          },
          {
            label: "インドネシア中煎り",
            data: [{ x: 0, y: 0, r: 7 }],

            backgroundColor: "rgba(10, 50, 50,0.5)",
          },
          {
            label: "インドネシア深煎り",
            data: [{ x: 0, y: 0, r: 7 }],

            backgroundColor: "rgba(10, 50, 50,1)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true, // 表示設定
                labelString: "役割", // ラベル
              },
              ticks: {
                max: 4,
                min: 1,
                stepSize: 1,
                callback: function (label, index, labels) {
                  let xLabels = ["リラックス", "", "", "目覚まし"];
                  return xLabels[label - 1];
                },
              },
            },
          ],
          // x軸
          yAxes: [
            {
              scaleLabel: {
                display: true, // 表示設定
                labelString: "苦さ", // ラベル
              },
              ticks: {
                max: 4,
                min: 1,
                stepSize: 1,
                callback: function (label, index, labels) {
                  let xLabels = ["浅い", "", "", "苦い"];
                  return xLabels[label - 1];
                },
              },
            },
          ],
        },
      },
    };
  },

  mounted() {
    if (this.receivedDatas) {
      for (
        let beanIterator = 0;
        beanIterator < this.receivedDatas.length;
        beanIterator++
      ) {
        this.data.datasets[beanIterator].data[0].x =
          this.receivedDatas[beanIterator].sumSituation /
          this.receivedDatas[beanIterator].countReviews;
        this.data.datasets[beanIterator].data[0].y =
          this.receivedDatas[beanIterator].sumBitterness /
          this.receivedDatas[beanIterator].countReviews;
      }
      this.renderChart(this.data, this.options);
    }
  },
};
</script>