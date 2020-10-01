<script>
import { Bubble } from "vue-chartjs";

export default {
  extends: Bubble,
  props: ["receivedData"],

  data() {
    return {
      data: {
        labels: this.$beanNames,
        datasets: [
          {
            label: "薄い",
            data: [{ x: 0, y: 0, r: 7 }],
            backgroundColor: "rgba(123, 85, 68,0.5)",
          },
          {
            label: "少し薄い",
            data: [{ x: 0, y: 0, r: 7 }],
            backgroundColor: "rgba(123, 85, 68,0.62)",
          },
          {
            label: "少し濃い",
            data: [{ x: 0, y: 0, r: 7 }],
            backgroundColor: "rgba(123, 85, 68,0.75)",
          },
          {
            label: "濃い",
            data: [{ x: 0, y: 0, r: 7 }],
            backgroundColor: "rgba(123, 85, 68,1)",
          },
          {
            label: "bodum基準",
            data: [{ x: 0, y: 0, r: 7 }],
            backgroundColor: "rgba(100, 10, 10,1)",
          },
          {
            label: "全体のベストレシピ",
            data: [{ x: 0, y: 0, r: 7 }],

            backgroundColor: "rgba(10, 100, 10,1)",
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true, // 表示設定
                labelString: "粉の量", // ラベル
              },
              ticks: {
                max: 12,
                min: 7,
                stepSize: 0.5,
                callback: function (label, index, labels) {
                  let xLabels = ["7", "8", "9", "10", "11"];
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
                labelString: "抽出時間", // ラベル
              },
              ticks: {
                max: 4,
                min: 1,
                stepSize: 0.5,
                callback: function (label, index, labels) {
                  let xLabels = ["3", "4", "5", "6"];
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
    console.debug("receivedData", this.receivedData);
    for (let strongIterator = 1; strongIterator <= 4; strongIterator++) {
      let targetCoffeeData;
      if ((targetCoffeeData = this.receivedData[`strong${strongIterator}`])) {
        console.debug("target : ", targetCoffeeData);
        console.debug(
          strongIterator,
          " : x : ",
          targetCoffeeData.sumPowderAmount / targetCoffeeData.count
        );
        console.debug(
          strongIterator,
          " : y : ",
          targetCoffeeData.sumExtractionTime / targetCoffeeData.count
        );
        this.data.datasets[strongIterator - 1].data[0].x =
          targetCoffeeData.sumPowderAmount / targetCoffeeData.count;

        this.data.datasets[strongIterator - 1].data[0].y =
          targetCoffeeData.sumExtractionTime / targetCoffeeData.count;
      }
    }
    this.renderChart(this.data, this.options);
  },
};
</script>