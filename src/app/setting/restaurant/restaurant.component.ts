import { Component, OnInit } from '@angular/core';

import { ApiserviceService } from 'src/app/apiservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  //สร้างตัวแปรสำหรับเก็บข้อมูลที่ดึงมาจาก 
  restaurantInfo : any;
 //ใน constructor กำหนด ให้ apiService เป็นตัวแปรแบบ private และ เรียกใช้งาน ApiService
  constructor(private router: Router, private api: ApiserviceService) { }

  ngOnInit(): void {
    //เรียก function getData เมื่อ App เริ่มทำงาน
    this.getRestaurantInfo();
  }
  
  async getRestaurantInfo() { 
    let mDataArray : any  = await this.api.getRestaurantInfo().toPromise(); 
    this.restaurantInfo =  mDataArray.c_data;

    localStorage.setItem("restaurantInfo", JSON.stringify(this.restaurantInfo));
 
  }  

}
