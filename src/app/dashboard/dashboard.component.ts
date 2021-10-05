import { Component, OnInit, VERSION, AfterViewInit } from "@angular/core";
import * as Highcharts from 'highcharts';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../api.service";

import { BlockData } from '../block-data';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as am4core from "@amcharts/amcharts4/core";
import type { XYChart } from "@amcharts/amcharts4/charts";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud"; 
am4core.useTheme(am4themes_animated);

// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_continentsHigh from "@amcharts/amcharts4-geodata/continentsHigh";

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);
import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

// const Exporting = require('highcharts/modules/exporting');
// Exporting(Highcharts);

// const ExportData = require('highcharts/modules/export-data');
// ExportData(Highcharts);

// const Accessibility = require('highcharts/modules/accessibility');
// Accessibility(Highcharts);
// import * as newdata from 'src/app/data.ts';
const Wordcloud = require('highcharts/modules/wordcloud');
Wordcloud(Highcharts);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public chart1: am4charts.XYChart;
  mapChart: any;
  // public chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
  // public series = this.chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
  public activity;
  public xData;
  public label;
  options:any;
  // text:string[] = [];
  ngAfterViewInit(){
    am4core.useTheme(am4themes_animated);
    var container = am4core.create("concatChart", am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    this.mapChart = container.createChild(am4maps.MapChart);

    this.mapChart.geodata = am4geodata_continentsHigh;

    this.mapChart.background.fill = am4core.color("#91c2dc");
    this.mapChart.background.fillOpacity = 1;
    this.mapChart.background.pixelPerfect = true;
    
    this.mapChart.projection = new am4maps.projections.Miller();

    var polygonSeries = this.mapChart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.fill = am4core.color("#FFFFFF");
    polygonSeries.exclude = ["antarctica"];
  }
  
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  responseData: any[]

  public liveCollapsed = false;
  
  blocks: BlockData[];

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    public rest: ApiService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
    var text = "Education For betterment As all we know that, in front of GOD we are equal. GOD gave us similar power  in front of GOD we are equal. GOD gave us similar power to all. He is not did any partiality for creating all of us. Instead all those we create this Reservation Education For betterment system which force us to create discrimination among us. Because of this discrimination there are many social hazards taking place. Education For betterment As all we are in front of GOD we are equal. GOD gave us similar power Human, so we maintain it also. Not accepting any Reservation Education For betterment system. Education For betterment It hampering our mentality. It also create many social violence. Today I like to create many social violence. Today I like to Education For betterment convey all of you about this harmful and Education For betterment violent system that already playing it’s game among us.";
    var obj ={name:'',weight:0}
    var lines = text.split(/[,\. ]+/g),
    data = Highcharts.reduce(lines, function (arr, word) {
      obj = Highcharts.find(arr, function (obj) {
        return obj.name === word;
    });
    if (obj) {
     
         obj.weight += 1;
    } else {
        obj = {
            name: word,
            weight: 1
        };
        arr.push(obj);
    }
    return arr;
}, []);
this.options = {
  accessibility: {
      screenReaderSection: {
          beforeChartFormat: '<h5>{chartTitle}</h5>' +
              '<div>{chartSubtitle}</div>' +
              '<div>{chartLongdesc}</div>' +
              '<div>{viewTableButton}</div>'
      }
  },
  series: [{
      type: 'wordcloud',
      data: data,
      name: 'Occurrences'
  }],
  title: {
      text: ''
  }
};
// this.chart1.data = [{
//   "hashtag":"hashtag1",
//   "tweets":25
// },{
//   "hashtag":"hashtag2",
//   "tweets":50
// },{
//   "hashtag":"hashtag3",
//   "tweets":15
// }
// ];
// let categoryAxis = this.chart1.xAxes.push(new am4charts.CategoryAxis());
// categoryAxis.dataFields.category = "country";
// categoryAxis.renderer.grid.template.location = 0;
// categoryAxis.renderer.minGridDistance = 30;
// categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
//   if (target.dataItem && target.dataItem.index && 1==1) {
//     return dy + 25;
//   }
//   return dy;
// });
// let valueAxis = this.chart1.yAxes.push(new am4charts.ValueAxis());
// let series = this.chart1.series.push(new am4charts.ColumnSeries());
// series.dataFields.valueY = "tweets";
// series.dataFields.categoryX = "hashtags";
// series.name = "TWEETS";
// series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
// series.columns.template.fillOpacity = .8;

// let columnTemplate = series.columns.template;
// columnTemplate.strokeWidth = 2;
// columnTemplate.strokeOpacity = 1;


  }

  ngOnInit() {
    this.blocks = [];
    Highcharts.chart('container', this.options);
    // public chart = am4plugins_wordCloud.WordCloud;
    // this.chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);

    this.chart1 = am4core.create("chartdiv1", am4charts.XYChart);
    this.chart1.colors.step = 2;
    // this.generateChartData();
    this.chart1.data = [{
      "hashtag":"hashtag1",
      "tweets":25
    },{
      "hashtag":"hashtag2",
      "tweets":50
    },{
      "hashtag":"hashtag3",
      "tweets":15
    },{
      "hashtag":"hashtag4",
      "tweets":45
    },{
      "hashtag":"hashtag5",
      "tweets":6
    }
    ];
    let categoryAxis = this.chart1.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "hashtag";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;
categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
  if (target.dataItem && target.dataItem.index && 1==1) {
    return dy + 15;
  }
  return dy;
});
let valueAxis = this.chart1.yAxes.push(new am4charts.ValueAxis());
let series = this.chart1.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "tweets";
series.dataFields.categoryX = "hashtag";
series.name = "TWEETS";
series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
series.columns.template.fillOpacity = .8;

let columnTemplate = series.columns.template;
columnTemplate.strokeWidth = 2;
columnTemplate.strokeOpacity = 1;
  }

  addCard() {
    console.log("here")
    this.blocks.push({
      blockHash: Math.random().toString(36).substring(2),
      blockNumber: this.blocks.length + 1,
      previousBlock: "0000",
      transactions: [
        {
          sender: 'sender',
          recipient: 'recipient',
          amount: 1,
          fee: 200
        }
      ]
    });
  }

  clearCards() {
    this.blocks.length = 0;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
      this.rest
        .gettweets(
          JSON.stringify({
            from: `${this.fromDate["year"]}-${"09"}-${this.fromDate["day"]}`,
            to: `${this.toDate["year"]}-${"09"}-${this.toDate["day"]}`,
          })
        )
        .subscribe((data) => {
          data = JSON.parse(data);
          this.responseData = data['key1'];

          //console.log(data);
          //console.log(this.responseData);
          console.log(data);
        });
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
