import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantComponent } from './setting/restaurant/restaurant.component';
import { ZoneComponent } from './setting/zone/zone.component';
import { TableComponent } from './setting/table/table.component';
import { UserComponent } from './setting/user/user.component';
import { MenuComponent } from './setting/menu/menu.component';
import { ItemComponent } from './setting/item/item.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { SpecialComponent } from './setting/special/special.component';
import { SpecialGroupComponent } from './setting/special-group/special-group.component';
import { RecommendComponent } from './setting/recommend/recommend.component';
import { PrinterComponent } from './setting/printer/printer.component'; 
import { RegisterComponent } from './register/register.component';
import { UofmComponent } from './setting/uofm/uofm.component';
// const routes: Routes = [
//   {path:"",pathMatch:"full",redirectTo: "login"},
//   {path:"login",component: LoginComponent},
//   {path:"home",component: HomeComponent}, 
//   {path:"dashboard",component: DashboardComponent},
//   {path:"report",component: ReportComponent},
//   {path:"restaurant",component: RestaurantComponent},
//   {path:"zone",component: ZoneComponent},
//   {path:"table",component: TableComponent},
// ];

const routes: Routes = [ 
  {path:"",pathMatch:"full",redirectTo: "login"},
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  {
    path: '', 
    component: HomeComponent, 
    children: [
      {path:"dashboard",component: DashboardComponent},
      {path:"report",component: ReportComponent},
      {path:"checklist",component: ChecklistComponent},
      {path:"restaurant",component: RestaurantComponent},
      {path:"zone",component: ZoneComponent},
      {path:"table",component: TableComponent},
      {path:"menu",component: MenuComponent},
      {path:"item",component: ItemComponent},
      {path:"user",component: UserComponent},
      {path:"uofm",component: UofmComponent},
      {path:"special",component: SpecialComponent},
      {path:"special-group",component: SpecialGroupComponent},
      {path:"recommend",component: RecommendComponent},
      {path:"printer",component: PrinterComponent}, 
 
      
    ]
  },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
