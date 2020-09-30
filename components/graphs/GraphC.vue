<script>
import { Bubble } from "vue-chartjs";

export default {
  extends: Bubble,
  props: ["datas"],

  data() {
    return {
      data: {
        labels: this.$beanNames,
        datasets: [
          {
            label: "ブラジル中煎り",
            data: [{ x: 1.3, y: 1.45, r: 5 }],
            backgroundColor: "rgba(100, 10, 10,0.5)",
          },
          {
            label: "ブラジル深煎り",
            data: [{ x: 1, y: 2, r: 5 }],
            backgroundColor: "rgba(100, 10, 10,1)",
          },
          {
            label: "コロンビア中煎り",
            data: [{ x: 2, y: 3, r: 5 }],
            backgroundColor: "rgba(10, 100, 10,0.5)",
          },
          {
            label: "コロンビア深煎り",
            data: [{ x: 2, y: 4, r: 5 }],
            backgroundColor: "rgba(10, 100, 10,1)",
          },
          {
            label: "タンザニア中煎り",
            data: [{ x: 3, y: 1, r: 5 }],
            backgroundColor: "rgba(10, 10, 100,0.5)",
          },
          {
            label: "タンザニア深煎り",
            data: [{ x: 3, y: 2, r: 5 }],
            backgroundColor: "rgba(10, 10, 100,1)",
          },
          {
            label: "インドネシア中煎り",
            data: [{ x: 2.3, y: 3, r: 5 }],
            backgroundColor: "rgba(10, 50, 50,0.5)",
          },
          {
            label: "インドネシア深煎り",
            data: [{ x: 1.4, y: 4, r: 5 }],
            backgroundColor: "rgba(10, 50, 50,1)",
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true, // 表示設定
                labelString: "役割", // ラベル
              },
              ticks: {
                max: 3,
                min: 1,
                stepSize: 0.5,
                callback: function (label, index, labels) {
                  let xLabels = ["リラックス", "", "目覚まし"];
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
                stepSize: 0.5,
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
    //     if (this.datas) {
    //       let middleBeans = [],
    //         deepBeans = [];

    //       for (var i = 0; i < this.datas.length; i++) {
    //         if (i % 2 == 0) {
    //           middleBeans.push(this.datas[i]);
    //         } else {
    //           deepBeans.push(this.datas[i]);
    //         }
    //       }
    //       this.data.datasets[0].data = middleBeans.map((bean) =>
    //         bean.countReviews ? bean.countReviews : 0
    //       );
    //       this.data.datasets[1].data = middleBeans.map((bean) =>
    //         bean.countCoffees ? bean.countCoffees : 0
    //       );
    //       this.data.datasets[2].data = deepBeans.map((bean) =>
    //         bean.countReviews ? bean.countReviews : 0
    //       );
    //       this.data.datasets[3].data = deepBeans.map((bean) =>
    //         bean.countCoffees ? bean.countCoffees : 0
    //       );

    this.renderChart(this.data, this.options);
    //     }
  },
};
</script>