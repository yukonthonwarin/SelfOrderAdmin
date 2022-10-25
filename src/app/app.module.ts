import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiserviceService } from './apiservice.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'; 
import { RestaurantComponent } from './setting/restaurant/restaurant.component';
import { TableComponent } from './setting/table/table.component';
import { PrinterComponent } from './setting/printer/printer.component';
import { UserComponent } from './setting/user/user.component';
import { ItemComponent } from './setting/item/item.component';
import { RecommendComponent } from './setting/recommend/recommend.component';
import { MenuComponent } from './setting/menu/menu.component';
import { ZoneComponent } from './setting/zone/zone.component';
import { SpecialComponent } from './setting/special/special.component';
import { SpecialGroupComponent } from './setting/special-group/special-group.component'; 
import { ReportComponent } from './report/report.component'; 

import { RegisterComponent } from './register/register.component';
import { UofmComponent } from './setting/uofm/uofm.component';
import { BillComponent } from './check/bill/bill.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ListbillComponent } from './listbill/listbill.component';
 
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,      
  ], 
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent, 
    DashboardComponent,
    RestaurantComponent,
    TableComponent,
    PrinterComponent,
    UserComponent,
    ItemComponent,
    RecommendComponent,
    MenuComponent,
    ZoneComponent,
    SpecialComponent,
    SpecialGroupComponent, 
    ReportComponent, 
    RegisterComponent,
    UofmComponent,
    BillComponent,
    ChecklistComponent,
    ListbillComponent,    
  ],
  
  exports : [ ],
  providers: [ApiserviceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 