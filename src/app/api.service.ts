import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  gettweets(data:any): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/get_tweets');
  }
  getweeklysentiments(sentimentta:any): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/get_weekly_sentiment_score/TCS');
  }
  getsummary(summart:any): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/get_summary/TCS');
  }
  getWordCLoud(): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/word_cloud');
  }
}
