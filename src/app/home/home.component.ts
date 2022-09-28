import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  notiList : any = [];

  public isCollapsed = false;
  public isCollapsedCheck = false;

  constructor(private router: Router,private api: ApiserviceService) { }

  ngOnInit(): void {
    this.doGet();
    setInterval(()=> { this.doGet()  }, 10 * 1000); 
  }

  go(order_hdr_id:any){
    this.router.navigate(['/bill?order_hdr_id='+order_hdr_id]);
  }

  async doGet(){ 
    let today : any = moment().format('YYYY-MM-DD');
    let r1 : any  = await this.api.get("order.list?e_action=print_bill&date="+today).toPromise(); 
    if(r1['success']){
      this.notiList = [];
      for (const key in r1.c_data) {
        let element = r1.c_data[key];
        this.notiList.push(element);
      }
    } 

  }

}
