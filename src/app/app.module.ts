import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SummaryComponent } from './summary/summary.component';
// import { TagCloudModule } from 'angular-tag-cloud-module';

import { HighchartsChartModule } from 'highcharts-angular';
import { NewStreamsComponent } from './new-streams/new-streams.component';
import { EditStreamsComponent } from './edit-streams/edit-streams.component';
import { HistoricalTrendsComponent } from './historical-trends/historical-trends.component';
import { SettingsComponent } from './settings/settings.component';
//import {MatNativeDateModule} from '@angular/material';
//import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    SummaryComponent,
    NewStreamsComponent,
    EditStreamsComponent,
    HistoricalTrendsComponent,
    SettingsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    HighchartsChartModule
    // TagCloudModule
    //MatDatepickerModule
  ],
  providers: [ThemeService,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
