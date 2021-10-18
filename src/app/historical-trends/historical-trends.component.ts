import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from "../api.service";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import * as am4core from "@amcharts/amcharts4/core";
import type { XYChart } from "@amcharts/amcharts4/charts";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud"; 
import * as am4maps from "@amcharts/amcharts4/maps";
am4core.useTheme(am4themes_animated);



@Component({
  selector: 'app-historical-trends',
  templateUrl: './historical-trends.component.html',
  styleUrls: ['./historical-trends.component.scss']
})
export class HistoricalTrendsComponent implements OnInit {
 

  ngAfterViewInit(){
    var chart = am4core.create('chartdiv', am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
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
}









  constructor() { }

  ngOnInit(): void {
  }

}
