import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditStreamsComponent } from './edit-streams/edit-streams.component';
import { HistoricalTrendsComponent } from './historical-trends/historical-trends.component';
import { NewStreamsComponent } from './new-streams/new-streams.component';
import { SettingsComponent } from './settings/settings.component';
import { SummaryComponent } from './summary/summary.component';
import { MarketResearchComponent } from './market-research/market-research.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  { path: 'insights', loadChildren: () => import('./test/test.module').then(m => m.InsightsDemoModule) },
  { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  // { path: 'summary', loadChildren: () => import('./summary/summary.component').then(m => m.SummaryComponent) }
  { path: 'summary', component: SummaryComponent },
  { path: 'newstreams', component: NewStreamsComponent },
  { path: 'editstreams', component: EditStreamsComponent},
  { path: 'trends', component: HistoricalTrendsComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'marketresearch', component: MarketResearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
