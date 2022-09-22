import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  restaurantInfo : any;

  constructor(private api: ApiserviceService) { }

  ngOnInit(): void {

    this.getRestaurantInfo();

  }

  async getRestaurantInfo() { 
    let mDataArray : any  = await this.api.getRestaurantInfo().toPromise(); 
    this.restaurantInfo =  mDataArray.c_data;

    localStorage.setItem("restaurantInfo", JSON.stringify(this.restaurantInfo));
 
  }  


}
