import { Component, OnInit } from '@angular/core';

// import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  // template: `
  //   <div>
  //     <angular-tag-cloud
  //       [data]="data"
  //       [width]="options.width"
  //       [height]="options.height"
  //       [overflow]="options.overflow">
  //     </angular-tag-cloud>
  //   </div>
  // `,
  styleUrls: ['./summary.component.scss']
})


export class SummaryComponent implements OnInit {

  // //public chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
  // options: CloudOptions = {
  //   // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
  //   width: 1000,
  //   // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
  //   height: 400,
  //   overflow: false,
  // };

  // data: CloudData[] = [
  //   {text: 'Weight-8-link-color', weight: 8, link: 'https://google.com', color: '#ffaaee'},
  //   {text: 'Weight-10-link', weight: 10, link: 'https://google.com', tooltip: 'display a tooltip'},
  //   // ...
  // ];

  constructor() { }

  ngOnInit(): void {
  }

}
