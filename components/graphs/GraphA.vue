<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,

  props: ["isMine", "propsDataPromise"],

  data() {
    return {
      isDataLoaded: false,
      data: {
        labels: [],
        datasets: [
          {
            label: "抽出数",
            data: [],
            backgroundColor: [
              "rgba(155, 118, 83, 0.5)",
              "rgba(155, 118, 83, 0.5)",
              "rgba(155, 118, 83, 0.5)",
              "rgba(155, 118, 83, 0.5)",
              "rgba(155, 118, 83, 0.5)",
              "rgba(155, 118, 83, 0.5)",
              "rgba(155, 118, 83, 0.5)",
              "rgba(155, 118, 83, 0.5)"
            ],
            borderColor: [
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)"
            ],
            borderWidth: 1
          },
          {
            label: "レビュー数",
            data: [],
            backgroundColor: [
              "rgba(155, 118, 83, 1)",
              "rgba(155, 118, 83, 1)",
              "rgba(155, 118, 83, 1)",
              "rgba(155, 118, 83, 1)",
              "rgba(155, 118, 83, 1)",
              "rgba(155, 118, 83, 1)",
              "rgba(155, 118, 83, 1)",
              "rgba(155, 118, 83, 1)"
            ],
            borderColor: [
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "豆の種類"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 10
              }
            }
          ]
        },
        onClick: this.handler
      }
    };
  },

  async created() {
    const beanData = await this.propsDataPromise
    for (let beanId in beanData) {
      const bean = beanData[beanId];
      this.data.labels.push(bean.name);
      if (this.isMine) {
        this.data.datasets[0].data.push(
          bean.usersDripCount ? bean.usersDripCount : 0
        );
        this.data.datasets[1].data.push(
          bean.usersReviewCount ? bean.usersReviewCount : 0
        );
      } else {
        this.data.datasets[0].data.push(bean.dripCount ? bean.dripCount : 0);
        this.data.datasets[1].data.push(
          bean.reviewCount ? bean.reviewCount : 0
        );
      }
    }
    this.isDataLoaded = true;
  },

  mounted() {
    this.renderChart(this.data, this.options);
  },
  watch: {
    isDataLoaded() {
      this.renderChart(this.data, this.options);
    }
  }, //TODO: storeに保存

  methods: {
    handler(point, event) {
      if (event.length === 0) {
        return;
      }
      const item = event[0];
      if (confirm(this.data.labels[item._index] + "のレビューを読みますか"))
        this.$router.push("/reviews/?bean_id=" + (item._index + 1));
    }
  }
};
</script>
