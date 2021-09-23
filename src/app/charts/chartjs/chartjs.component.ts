import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})
export class ChartjsComponent implements OnInit {
  
  lineChartData = [{
    label: '# of Mixed Sentiment',
    data: [],
    borderWidth: 1,
    fill: false
  }];

  lineChartLabels = [];

  lineChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  lineChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)'
    }
  ];

  plineChartData = [{
    label: '# of Mixed Sentiment',
    data: [],
    borderWidth: 1,
    fill: false
  }];

  nlineChartData = [{
    label: '# of Mixed Sentiment',
    data: [],
    borderWidth: 1,
    fill: false
  }];
  neulineChartData = [{
    label: '# of Mixed Sentiment',
    data: [],
    borderWidth: 1,
    fill: false
  }];



  constructor(public rest: ApiService) { }

  ngOnInit() {
    this.rest
        .gettweets(
          JSON.stringify({
            from: `2021-08-15`,
            to: `2021-09-20`,
          })
        )
        .subscribe((data) => {
          var sentiment = []
          var psentiment = []
          var nsentiment = []
          var neusentiment = []
          var created_at = []
          for(let item of data['data']){
            sentiment.push(item['sentiment_score_mixed'])
            neusentiment.push(item['sentiment_score_neutral'])
            nsentiment.push(item['sentiment_score_negative'])
            psentiment.push(item['sentiment_score_positive'])
            created_at.push(item['created_at'])
          }
          this.lineChartData[0]['data'] = sentiment
          this.plineChartData[0]['data'] = psentiment
          this.nlineChartData[0]['data'] = nsentiment
          this.neulineChartData[0]['data'] = neusentiment
          this.lineChartLabels = created_at
        });
  }

}
