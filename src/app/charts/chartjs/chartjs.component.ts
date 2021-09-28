import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../api.service";
import type { XYChart } from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-chartjs",
  templateUrl: "./chartjs.component.html",
  styleUrls: ["./chartjs.component.scss"],
})

// let chart = am4core.create("chartdiv", am4charts.XYChart);
export class ChartjsComponent implements OnInit {
  public chart: am4charts.XYChart;
  // chart = am4core.create("chartdiv", am4charts.XYChart);
  public dateAxis: any;
  lineChartData = [
    {
      label: "# of Mixed Sentiment",
      data: [],
      borderWidth: 1,
      fill: false,
    },
  ];

  lineChartLabels = [];

  lineChartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  lineChartColors = [
    {
      borderColor: "rgba(255,99,132,1)",
    },
  ];

  plineChartData = [
    {
      label: "# of Mixed Sentiment",
      data: [],
      borderWidth: 1,
      fill: false,
    },
  ];

  nlineChartData = [
    {
      label: "# of Mixed Sentiment",
      data: [],
      borderWidth: 1,
      fill: false,
    },
  ];
  neulineChartData = [
    {
      label: "# of Mixed Sentiment",
      data: [],
      borderWidth: 1,
      fill: false,
    },
  ];

  constructor(public rest: ApiService) {}

  createAxisAndSeries(field, name, opposite, bullet) {
    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis<any>());
    // if (this.chart.yAxes.indexOf(valueAxis) != 0) {
    //   valueAxis.syncWithAxis = this.chart.yAxes.getIndex(0);
    // }

    let series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.yAxis = valueAxis;
    series.name = name;
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.tensionX = 0.8;
    series.showOnInit = true;

    let interfaceColors = new am4core.InterfaceColorSet();

    switch (bullet) {
      case "triangle":
        let shape = series.bullets.push(new am4charts.Bullet());
        shape.width = 12;
        shape.height = 12;
        shape.horizontalCenter = "middle";
        shape.verticalCenter = "middle";

        let triangle = shape.createChild(am4core.Triangle);
        triangle.stroke = interfaceColors.getFor("background");
        triangle.strokeWidth = 2;
        triangle.direction = "top";
        triangle.width = 12;
        triangle.height = 12;
        break;
      case "rectangle":
        let shape1 = series.bullets.push(new am4charts.Bullet());
        shape1.width = 10;
        shape1.height = 10;
        shape1.horizontalCenter = "middle";
        shape1.verticalCenter = "middle";

        let rectangle = shape1.createChild(am4core.Rectangle);
        rectangle.stroke = interfaceColors.getFor("background");
        rectangle.strokeWidth = 2;
        rectangle.width = 10;
        rectangle.height = 10;
        break;
      case "polygon":
        let shape3 = series.bullets.push(new am4charts.Bullet());
        shape3.width = 10;
        shape3.height = 10;
        shape3.horizontalCenter = "middle";
        shape3.verticalCenter = "middle";

        let polygon = shape3.createChild(am4core.Rectangle);
        polygon.stroke = interfaceColors.getFor("background");
        polygon.strokeWidth = 2;
        polygon.width = 10;
        polygon.height = 10;
        break;
      default:
        let shape2 = series.bullets.push(new am4charts.CircleBullet());
        shape2.circle.stroke = interfaceColors.getFor("background");
        shape2.circle.strokeWidth = 2;
        break;
    }

    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.renderer.line.stroke = series.stroke;
    valueAxis.renderer.labels.template.fill = series.stroke;
    valueAxis.renderer.opposite = opposite;
  }

  generateChartData() {
    var sentiment = [];
    this.rest
      .getweeklysentiments(
        JSON.stringify({
          from: `2021-09-01`,
          to: `2021-09-07`,
        })
      )
      .subscribe((sentimentta) => {
        sentimentta = JSON.parse(sentimentta);
        // console.log(sentiment);
        // var sentiment = [],
        for (let item of Object.keys(sentimentta)) {
          sentimentta[item]["date"] = item;
          sentiment.push(sentimentta[item]);
        }
        console.log(sentiment);
        this.chart.data = sentiment;
        this.dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
        this.dateAxis.renderer.minGridDistance = 50;
        this.createAxisAndSeries(
          "sentiment_score_neutral",
          "Sentiment score neutral",
          false,
          "circle"
        );
        this.createAxisAndSeries(
          "sentiment_score_negative",
          "sentiment_score_negative",
          false,
          "polygon"
        );
        this.createAxisAndSeries(
          "sentiment_score_positive",
          "sentiment_score_positive",
          true,
          "triangle"
        );
        this.createAxisAndSeries(
          "sentiment_score_mixed",
          "sentiment_score_mixed",
          true,
          "rectangle"
        );
        this.chart.legend = new am4charts.Legend();

        // Add cursor
        this.chart.cursor = new am4charts.XYCursor();
        // return sentiment;
      });
  }

  ngOnInit() {
    this.chart = am4core.create("chartdiv", am4charts.XYChart);
    this.chart.colors.step = 2;
    this.generateChartData();
  }
}