import { Component, OnInit, VERSION, AfterViewInit, NgZone } from "@angular/core";
import * as Highcharts from 'highcharts';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../api.service";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { BlockData } from '../block-data';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormControl, FormGroup } from '@angular/forms';

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
// import { DatePipe } from '@angular/common';

// const Exporting = require('highcharts/modules/exporting');
// Exporting(Highcharts);

// const ExportData = require('highcharts/modules/export-data');
// ExportData(Highcharts);

// const Accessibility = require('highcharts/modules/accessibility');
// Accessibility(Highcharts);
// import * as newdata from 'src/app/data.ts';
const Wordcloud = require('highcharts/modules/wordcloud');
Wordcloud(Highcharts);

// import { DatePipe } from '@angular/common'

import { ExampleHeaderComponent } from "src/app/dashboard/example-header/example-header.component";
import { DatePipe } from '@angular/common';
// import { start } from "repl";
// C:\Users\Harshil\SocialFootprintTempalte\src\app\dashboard\example-header\example-header.component.ts
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  providers: [
    DatePipe
  ]
})

export class DashboardComponent implements OnInit {
  readonly ExampleHeaderComponent = ExampleHeaderComponent;
  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  formattedStart : any;
  formattedEnd : any;

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
    this.showResponse();
    var text = this.stringResult;
    var obj ={name:'',weight:0}
    var lines = this.stringResult.split(/[,\. ]+/g),
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












    var chart = am4core.create('chartdiv', am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    // polygonSeries.data = [{
    //   "id": "US",
    //   "name": "United States",
    //   "value": 100,
    //   "fill": am4core.color("#F05C5C")
    // }, {
    //   "id": "FR",
    //   "name": "France",
    //   "value": 50,
    //   "fill": am4core.color("#5C5CFF")
    // }];
    var polygonTemplate = polygonSeries.mapPolygons.template;

polygonTemplate.tooltipText = '{name}';
polygonTemplate.fill = am4core.color('#74B266');
polygonTemplate.events.on('hit', function(ev) {
  ev.target.series.chart.zoomToMapObject(ev.target);
});
var hs = polygonTemplate.states.create('hover');
hs.properties.fill = am4core.color('#367B25');
polygonSeries.exclude = ['AQ'];
chart.zoomControl = new am4maps.ZoomControl();
var buttonTopPosition;
polygonSeries.events.on('inited', () => {
  polygonSeries.mapPolygons.each(polygon => {
    // const id = polygon.dataItem.dataContext.id;
    let assignButton;

    // switch (id) {
    //   case 'US':
    //     assignButton = 'us';
    //     break;

    //   case 'BR':
    //     assignButton = 'br';
    //     break;

    //   default:
    //     break;
    // }

    if (assignButton) {
      const button = document.getElementById(`${assignButton}-button`);
      button.addEventListener('click', () => {
        chart = createMarkers(chart);
        setTimeout(() => {
          const animation = chart.zoomToMapObject(polygon);
          animation.events.on('animationended', () => {
            chart.homeGeoPoint = chart.centerGeoPoint;
            chart.homeZoomLevel = chart.zoomLevel;
          });
        }, 500);
      });
    }
  });
});
polygonSeries.data = [{
  "id": "US",
  "name": "United States",
  "value": 10,
  "fill": am4core.color("#F05C5C")
}, {
  "id":"CA",
  "name":"Canada",
  "value":90,
  "fill":am4core.color("#FFFF00")
},{
  "id":"IN",
  "name":"India",
  "value":170,
  "fill":am4core.color("#0000FF")
},{
  "id":"AR",
  "name":"Argentina",
  "value": 115,
  "fill":am4core.color("#FFA500")
}];
polygonTemplate.propertyFields.fill = "fill";
function createMarkers(chart) {
  console.log('calling createMarkers');
  const demoAddress = { my_lat: 35.6895, my_lng: 139.6917 };
  const mapImageSeries = chart.series.push(new am4maps.MapImageSeries());

  const imageSeriesTemplate = mapImageSeries.mapImages.template;
  const circle = imageSeriesTemplate.createChild(am4core.Circle);
  circle.radius = 10;
  circle.fill = am4core.color('#ff0000');
  circle.stroke = am4core.color('#FFFFFF');
  circle.strokeWidth = 2;
  circle.nonScaling = true;
  circle.tooltipText = 'hi';
  imageSeriesTemplate.propertyFields.latitude = 'latitude';
  imageSeriesTemplate.propertyFields.longitude = 'longitude';
  // mapImageSeries.data = { latitude: demoAddress.latitude, longitude: demoAddress.longitude };
  return chart;
}


    // am4core.useTheme(am4themes_animated);
    // var container = am4core.create("concatChart", am4core.Container);
    // container.width = am4core.percent(100);
    // container.height = am4core.percent(100);

    // this.mapChart = container.createChild(am4maps.MapChart);

    // this.mapChart.geodata = am4geodata_continentsHigh;

    // this.mapChart.background.fill = am4core.color("#91c2dc");
    // this.mapChart.background.fillOpacity = 1;
    // this.mapChart.background.pixelPerfect = true;
    
    // this.mapChart.projection = new am4maps.projections.Miller();

    // var polygonSeries = this.mapChart.series.push(new am4maps.MapPolygonSeries());
    // polygonSeries.useGeodata = true;
    // polygonSeries.mapPolygons.template.fill = am4core.color("#FFFFFF");
    // polygonSeries.exclude = ["antarctica"];
  }
  
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  responseData: any[]

  public liveCollapsed = false;
  
  blocks: BlockData[];

  // myDate = new Date();

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    public rest: ApiService,
    private zone: NgZone,
    private datePipe: DatePipe
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
    // this.myDate = this.datePipe.transform(this.myDate,'yyyy-MM-dd');
    
    // var text = "Education For betterment As all we know that, in front of GOD we are equal. GOD gave us similar power  in front of GOD we are equal. GOD gave us similar power to all. He is not did any partiality for creating all of us. Instead all those we create this Reservation Education For betterment system which force us to create discrimination among us. Because of this discrimination there are many social hazards taking place. Education For betterment As all we are in front of GOD we are equal. GOD gave us similar power Human, so we maintain it also. Not accepting any Reservation Education For betterment system. Education For betterment It hampering our mentality. It also create many social violence. Today I like to create many social violence. Today I like to Education For betterment convey all of you about this harmful and Education For betterment violent system that already playing it’s game among us.";
    // var text = this.stringResult;
    // var text = "RT  Participants and spectators: the 2021 Bank of America Chicago Marathon Mobile App, powered by  is now available! Down\\u2026RT  Participants and spectators: the 2021 Bank of America Chicago Marathon Mobile App, powered by  is now available! Down\\u2026RT  On today's Tech Briefing \\n\\n\\u2022  hits $3 billion in valuation \\n\\u2022  lands MCX mandate \\n\\u2022 RBI's AFA rule kick\\u2026RT  Great insights at the  Business Leaders Forum from  's   and 's  and Dear RATAN TATA SIR     \\nSir Anil kumar from chandigarh\\nWhen I see this advertisement message ,I feel happy because I have tata Tiago new car .then I advertise this message from my all contacts as per instruction. I win the tata Nexon      future multibaggersParticipants and spectators: the 2021 Bank of America Chicago Marathon Mobile App, powered by  is now available! Download today in the App Store and Google Play:   It can beRT             \\nSir please introduce a mobile application for Tata mutual fund. For ease of operationsRT  \\u092e\\u0947\\u0930\\u093f\\u091fLIST\\u091c\\u093e\\u0930\\u0940_\\u0915\\u0930\\u094b\\n\\u092e\\u0947\\u0930\\u093f\\u091fLIST\\u091c\\u093e\\u0930\\u0940_\\u0915\\u0930\\u094b\\n\\u0939\\u092e\\u0947\\u0902_\\u0939\\u092e\\u093e\\u0930\\u093e_\\u0939\\u0915\\u0926\\u094b\\u092e\\u0947\\u0930\\u093f\\u091fLIST\\u091c\\u093e\\u0930\\u0940_\\u0915\\u0930\\u094b\\n\\n leney ke chakkar mai aap kha samey barbad honey ka suru na ho jaye  is a huge lose business      RT   (TCS) today announced a practice test for     RT  Tata Sons selected as winning bidder for Air India.\\n      https\\u2026RT  Participants and spectators: the 2021 Bank of America Chicago Marathon Mobile App, powered by  is now available! Down\\u2026 \\n \\n  We CA interns are ourselves facing this everyday. Don\\u2019t know who could help?\\n\\nMaybe  Did you know you can register for employability support on the new  app? Free to download at the Apple Store or Google Play the app provides up to date info on into work projects, courses, job clubs &amp; more.\\n\\n  RT  Excited to have our AR/VR Forte Glove selected for \\u201cAsha,\\u201d an avatar robot for next-generation social  and s\\u2026RT  Curious to know what\\u2019s headed your way? Just sit back &amp; believe us! We are up to something exciting. \\n\\n\\u2026       This is a fake letter. Resolve this issue for Shirdi Saibaba Live Feed.check for server,that changed today.     season kicks off next week\\n\\n     RT  Is it necessary for  organizations to rely on outsourcing models? How will this help them? \\n\\nCatch the SCDM conference\\u2026RT  We are bridging the gap to create more opportunities. \\n.\\n.\\n.\\n   RT  Participants and spectators: the 2021 Bank of America Chicago Marathon Mobile App, powered by  is now available! Down\\u2026 should be CHANGE its present OFFICE building  &amp; CHANGE VAASTU.\\nI'm saying for NATIONAL INTEREST.\\nWithin 96 days.., IT WILL TAKE HUGE TAKE OFF FINANCIALLY.\\n\\n        RT  Curious to know what\\u2019s headed your way? Just sit back &amp; believe us! We are up to something exciting. \\n\\n\\u2026RT    I haven\\u2019t received any concrete help yet.  Please help      Congratulations Team, Wishing you All the Best in the process of Nation building. All India Loving people will help you build World Class Airline.India need your support to Commercialize  . This will be major step towards future    Example of what PPP can do Selected student for Rural IT Quiz State level from our Institutes.\\n         offers a free 15-day course for freshers and graduates. How to apply\\u2026 - \\u201cThe course covers key behavioural and  and foundational skills in , IT and \\u201d  \\n RT  Was great meeting Govt of Maharashtra environment minister  and understanding his vision for the state. It\\u2019s v\\u2026           RT  Curious to know what\\u2019s headed your way? Just sit back &amp; believe us! We are up to something exciting. \\n\\n\\u2026 has won a large deal from the country\\u2019s largest commodity exchange Multi Commodity Exchange to build a new technology platform for trading as well as post-trade functions. \\n \\nRT  \\n\\nThe UK arm of  a leading software &amp; IT services provider, clocked revenue worth ~\\u00a33 Billion in 2\\u2026Through our valued partnership with  we enable next generation supply chain systems for our customers. Read this blog post by Sagar to learn about the use case and how our intelligent technologies with  &amp;  support this mission.   RT  We are bridging the gap to create more opportunities.";
    // var text = "Test launch of first Indian 4G network of  (Designed and Made in India i.e ) by tech giants like  must  develop an Indian software framework. Imagine if Android doesn't work in India for sometime, what will be impact on our economy? By   technology giants like TATA (TCS) will drive decade of NextGen air travel.";
//     var obj ={name:'',weight:0}
//     var lines = text.split(/[,\. ]+/g),
//     data = Highcharts.reduce(lines, function (arr, word) {
//       obj = Highcharts.find(arr, function (obj) {
//         return obj.name === word;
//     });
//     if (obj) {
     
//          obj.weight += 1;
//     } else {
//         obj = {
//             name: word,
//             weight: 1
//         };
//         arr.push(obj);
//     }
//     return arr;
// }, []);
// this.options = {
//   accessibility: {
//       screenReaderSection: {
//           beforeChartFormat: '<h5>{chartTitle}</h5>' +
//               '<div>{chartSubtitle}</div>' +
//               '<div>{chartLongdesc}</div>' +
//               '<div>{viewTableButton}</div>'
//       }
//   },
//   series: [{
//       type: 'wordcloud',
//       data: data,
//       name: 'Occurrences'
//   }],
//   title: {
//       text: ''
//   }
// };
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

  onSubmit(){
    this.formattedStart =  this.datePipe.transform(this.range.value.start, "yyyy-MM-dd");
    this.formattedEnd = this.datePipe.transform(this.range.value.end,"yyyy-MM-dd");
    console.log(this.formattedStart);
    console.log(this.formattedEnd);
   }

  // myFunction(){
  //   this.myDate=new Date();
  //   let latest_date =this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  //  }
  stringResult : string = ""

  

  ngOnInit() {
    this.showResponse();
    this.onSubmit();
    console.log(typeof(this.stringResult));
    console.log(this.stringResult);
    var text = this.stringResult['complete_text'];
//     var obj ={name:'',weight:0}
//     var lines = this.stringResult.split(/[,\. ]+/g),
//     data = Highcharts.reduce(lines, function (arr, word) {
//       obj = Highcharts.find(arr, function (obj) {
//         return obj.name === word;
//     });
//     if (obj) {
     
//          obj.weight += 1;
//     } else {
//         obj = {
//             name: word,
//             weight: 1
//         };
//         arr.push(obj);
//     }
//     return arr;
// }, []);
// this.options = {
//   accessibility: {
//       screenReaderSection: {
//           beforeChartFormat: '<h5>{chartTitle}</h5>' +
//               '<div>{chartSubtitle}</div>' +
//               '<div>{chartLongdesc}</div>' +
//               '<div>{viewTableButton}</div>'
//       }
//   },
//   series: [{
//       type: 'wordcloud',
//       data: data,
//       name: 'Occurrences'
//   }],
//   title: {
//       text: ''
//   }
// };





    this.blocks = [];
    // Highcharts.chart('container', this.options);
    // public chart = am4plugins_wordCloud.WordCloud;
    // this.chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);

    this.chart1 = am4core.create("chartdiv1", am4charts.XYChart);
    this.chart1.colors.step = 2;
    // this.generateChartData();
    this.chart1.data = [{
      "hashtag":"#infy",
      "tweets":87
    },{
      "hashtag":"#tcs",
      "tweets":43
    },{
      "hashtag":"#incometax",
      "tweets":35
    },{
      "hashtag":"#niftyit",
      "tweets":33
    },{
      "hashtag":"#gann",
      "tweets":17
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
valueAxis.title.text = "Number of Tweets";
series.dataFields.valueY = "tweets";
series.dataFields.categoryX = "hashtag";
series.name = "TWEETS";
series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
series.columns.template.fillOpacity = .8;

let columnTemplate = series.columns.template;
columnTemplate.strokeWidth = 2;
columnTemplate.strokeOpacity = 1;
  }

  showResponse(){
    this.rest.getWordCLoud().subscribe(
        r => {
      r = JSON.parse(r) 
      this.stringResult = r['complete_text']
    console.log(typeof(r))
    var obj ={name:'',weight:0}
    var lines = this.stringResult.split(/[,\. ]+/g),
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





    this.blocks = [];
    Highcharts.chart('container', this.options);
  
  },
         
        err => console.log(err)
    )
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
