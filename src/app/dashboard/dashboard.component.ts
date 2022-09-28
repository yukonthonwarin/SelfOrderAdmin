import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import {CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  restaurantInfo : any;
  data : any;
  total_week1 : any = 0.0;
  total_week2 : any = 0.0;

  constructor(private api: ApiserviceService) { 
    
  }

  ngOnInit(): void { 
    this.doGet(); 
  }

  async doGet(){
    

  

    let result : any  = await this.api.get("report.dashboard").toPromise(); 
    this.data  =  result.c_data;  
    
    //sum_payment_week1
    let labels = [];
    let sum_payment_week1 = []
    this.total_week1 = 0;
    for (const key in this.data.sum_payment_week1) {
      const element = this.data.sum_payment_week1[key];
      labels.push(element['day_name'] );
      sum_payment_week1.push(element['total']*1);
      this.total_week1 += (element['total']*1);
    }
    //sum_payment_week2
    let sum_payment_week2 = [];
    this.total_week2 = 0;
    for (const key in this.data.sum_payment_week2) {
      const element = this.data.sum_payment_week2[key]; 
      sum_payment_week2.push(element['total']*1);
      this.total_week2 += (element['total']*1);
    }
 
    const myChart = new Chart(
      'myChart',
      {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'ยอดขายสัปดาห์นี้',
            backgroundColor: 'rgb(26, 179, 148, 0.4)',
            borderColor: 'rgb(26, 179, 148)',
            data: sum_payment_week1,
            fill: 'origin'
          },{
            label: 'ยอดขายสัปดาห์ที่ผ่านมา',
            backgroundColor: 'rgb(220, 220, 220, 0.3)',
            borderColor: 'rgb(220, 220, 220)',
            data: sum_payment_week2,
            fill: 'origin'
          }]
        },
        options: {}
      }
    );
  }


}
