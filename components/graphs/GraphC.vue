<script>
import { Bubble } from "vue-chartjs";
import Chart from "chart.js";
export default {
  extends: Bubble,
  props: { getPositionDataPromise: Promise, isMine: Boolean },

  data() {
    return {
      data: {
        labels: [],
        datasets: [],
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
                  let xLabels = ["苦くない", "", "", "苦い"];
                  return xLabels[label - 1];
                },
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              return data.labels[tooltipItem[0].datasetIndex];
            },
            label: (tooltipItem, data) => {
              return `役割 : ${tooltipItem.xLabel} , 苦さ : ${tooltipItem.yLabel}`;
            },
          },
        },
      },
    };
  },

  async mounted() {
    const backgroundColorsArray = [
      "rgba(100, 10, 10,0.5)",
      "rgba(100, 10, 10,1)",
      "rgba(10, 100, 10,0.5)",
      "rgba(10, 100, 10,1)",
      "rgba(10, 10, 100,0.5)",
      "rgba(10, 10, 100,1)",
      "rgba(10, 50, 50,0.5)",
      "rgba(10, 50, 50,1)",
    ];
    await this.getPositionDataPromise.then((receivedDataObject) => {
      if (receivedDataObject) {
        for (
          let beanIterator = 1;
          beanIterator <= Object.keys(receivedDataObject).length;
          beanIterator++
        ) {
          this.data.labels.push(receivedDataObject[beanIterator].beanName);
          const beanData = {
            label: receivedDataObject[beanIterator].beanName,
            backgroundColor: backgroundColorsArray[beanIterator - 1],
            data: [
              {
                x: this.isMine
                  ? receivedDataObject[beanIterator].usersAvgSituation
                  : receivedDataObject[beanIterator].avgSituation || 0,
                y: this.isMine
                  ? receivedDataObject[beanIterator].usersAvgBitterness
                  : receivedDataObject[beanIterator].avgBitterness || 0,
                r: 7,
              },
            ],
          };
          this.data.datasets.push(beanData);
        }

        this.renderChart(this.data, this.options);
      } else {
        console.warn("データがありません");
      }
    });
  },
};
</script>
