import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { InsightsComponent } from './insights/insights.component';

const routes: Routes = [
  { path: '', component: InsightsComponent },
  { path: 'insights', component: InsightsComponent },
]

@NgModule({
  declarations: [InsightsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule
  ]
})
export class InsightsDemoModule { }
