<script>
import { Bubble } from "vue-chartjs";

export default {
  extends: Bubble,
  props: ["propsDataPromise", "isMine"],

  data() {
    return {
      data: {
        labels: [
          "薄い",
          "やや薄い",
          "少し濃い",
          "濃い",
          "bodum基準",
          "全体のベストレシピ",
        ],
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true, // 表示設定
                labelString: "粉の量 ( g/100mL )", // ラベル
              },
              ticks: {
                max: 15,
                min: 5,
                stepSize: 1,
              },
            },
          ],
          // x軸
          yAxes: [
            {
              scaleLabel: {
                display: true, // 表示設定
                labelString: "抽出時間 (min)", // ラベル
              },
              ticks: {
                max: 7,
                min: 0,
                stepSize: 0.5,
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
              return `粉の量: ${tooltipItem.xLabel} g / 100ml, 抽出時間 : ${tooltipItem.yLabel} min`;
            },
          },
        },
      },
    };
  },

  async mounted() {
    await this.setData();
    this.renderChart(this.data, this.options);
  },

  watch: {
    async propsDataPromise() {
      await this.setData();
      this.renderChart(this.data, this.options);
    },
  },
  methods: {
    async setData() {
      const data = await this.propsDataPromise;
      if (data) {
        if (this.isMine) {
          ["薄い", "やや薄い", "少し濃い", "濃い"].forEach((value, index) => {
            this.data.datasets[index].data[0].x =
              data[`${index + 1}`].usersAveragePowderAmountPer120cc; // 濃さ
            this.data.datasets[index].data[0].y =
              data[`${index + 1}`].usersAverageExtractionTime; // 濃さ
          });
        } else {
          ["薄い", "やや薄い", "少し濃い", "濃い"].forEach((value, index) => {
            this.data.datasets[index].data[0].x =
              data[`${index + 1}`].averagePowderAmountPer120cc; // 濃さ
            this.data.datasets[index].data[0].y =
              data[`${index + 1}`].averageExtractionTime; // 濃さ
          });
        }
        this.data.datasets[4].data[0].x = 7; // 濃さ
        this.data.datasets[4].data[0].y = 4; // 濃さ
      }
    },
  },
};
</script>
