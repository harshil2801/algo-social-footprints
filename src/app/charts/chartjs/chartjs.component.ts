import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { ViewChild, ElementRef } from '@angular/core';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Chart } from 'chart.js';

let chart = am4core.create("chartdiv", am4charts.XYChart);
chart.data = generateChartData();
function generateChartData(){
  var sentiment = []
  this.rest
        .getweeklysentiments(
          JSON.stringify({
            from: `2021-09-01`,
            to: `2021-09-07`,
          })
        )
        .subscribe((sentimentta) => {
          sentimentta = JSON.parse(sentimentta);
          console.log(sentimentta);
          // var sentiment = [],
          for(let item of Object.keys(sentimentta)){
            sentimentta[item]['date'] = item;
            sentiment.push(sentimentta[item]);

          }
          // return sentiment;
  })
  return sentiment;
}
let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})

// let chart = am4core.create("chartdiv", am4charts.XYChart);

export class ChartjsComponent implements OnInit {

 // public chart : am4core.create("chartdiv", am4charts.XYChart);

  @ViewChild('myCanvas')
  public canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType: string = 'line';
  public chartData: any[];
  public chartLabels: any[];
  public chartColors: any[];
  public chartOptions: any;
  
  // lineChartData = [{
  //   label: '# of Mixed Sentiment',
  //   data: [],
  //   borderWidth: 1,
  //   fill: false
  // }];

  // lineChartLabels = [];

  // lineChartOptions = {
  //   scales: {
  //     yAxes: [{
  //       ticks: {
  //         beginAtZero: true
  //       }
  //     }]
  //   },
  //   legend: {
  //     display: false
  //   },
  //   elements: {
  //     point: {
  //       radius: 0
  //     }
  //   }
  // };

  // lineChartColors = [
  //   {
  //     borderColor: 'rgba(255,99,132,1)'
  //   }
  // ];

  // plineChartData = [{
  //   label: '# of Mixed Sentiment',
  //   data: [],
  //   borderWidth: 1,
  //   fill: false
  // }];

  // nlineChartData = [{
  //   label: '# of Mixed Sentiment',
  //   data: [],
  //   borderWidth: 1,
  //   fill: false
  // }];
  // neulineChartData = [{
  //   label: '# of Mixed Sentiment',
  //   data: [],
  //   borderWidth: 1,
  //   fill: false
  // }];

  

  constructor(public rest: ApiService) { }

  ngOnInit() {

    
    
      

    this.rest
        .getweeklysentiments(
          JSON.stringify({
            from: `2021-09-01`,
            to: `2021-09-07`,
          })
        )
        .subscribe((sentimentta) => {
          sentimentta = JSON.parse(sentimentta);
          console.log(sentimentta);
          var sentiment = []
          var psentiment = []
          var nsentiment = []
          var neusentiment = []
          var msentiment = []
          for(let item of Object.keys(sentimentta)){
            sentiment.push(sentimentta[item])
            // neusentiment.push(item['sentiment_score_neutral'])
            // nsentiment.push(item['sentiment_score_negative'])
            // psentiment.push(item['sentiment_score_positive'])
            // msentiment.push(item['created_at'])
          }
          //this.lineChartData[0]['key1'] = sentiment
          // this.plineChartData[0]['day1'] = psentiment
          // this.nlineChartData[0]['day1'] = nsentiment
          // this.neulineChartData[0]['day1'] = neusentiment
          // this.lineChartLabels[0]['day1'] = msentiment
        });
  }

}
