<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,

  props: ["datas"],

  data() {
    return {
      data: {
        labels: ["BRA", "COL", "TZA", "IDN"],
        // labels: ["BRA"],
        datasets: [
          {
            label: "中煎りレビュー数",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
          {
            label: "中煎り提供数",
            data: [], //BRA中提,COL中提,TZA中提,IDN中提
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255,0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
          {
            label: "深煎りレビュー数",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
          {
            label: "深煎り提供数",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "豆の種類",
              },
              //   stacked: true,
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 10,
              },
              // stacked: true
            },
          ],
        },
      },
    };
  },

  mounted() {
    if (this.datas) {
      let middleBeans = [],
        deepBeans = [];

      for (var i = 0; i < this.datas.length; i++) {
        if (i % 2 == 0) {
          middleBeans.push(this.datas[i]);
        } else {
          deepBeans.push(this.datas[i]);
        }
      }
      this.data.datasets[0].data = middleBeans.map((bean) =>
        bean.countReviews ? bean.countReviews : 0
      );
      this.data.datasets[1].data = middleBeans.map((bean) =>
        bean.countCoffees ? bean.countCoffees : 0
      );
      this.data.datasets[2].data = deepBeans.map((bean) =>
        bean.countReviews ? bean.countReviews : 0
      );
      this.data.datasets[3].data = deepBeans.map((bean) =>
        bean.countCoffees ? bean.countCoffees : 0
      );

      this.renderChart(this.data, this.options);
    }
  },
};
</script>