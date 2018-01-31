import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}    from '@angular/http';
import {FormsModule}    from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import {APP_CONFIG, ALGO_CONFIG} from './app-config';
import {AppComponent}  from './app.component';
import {ErrorComponent} from './component/error/error.component';
import {UserDashboardComponent} from './component/user-dashboard/user-dashboard.component';
import {HomeComponent} from './component/home/home.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    children: [
      { path: '',
        component: HomeComponent
      },
    ]
  },
  {path: 'algo', redirectTo: '/dashboard', pathMatch: 'prefix'},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    UserDashboardComponent,
    HomeComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {provide: APP_CONFIG, useValue: ALGO_CONFIG},
    {provide: APP_BASE_HREF, useValue: '/'},
  ]
})
export class AppModule {
}
