import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  dataList : any = [];
  orderList : any = []; 
  isAll : boolean = true;
  myInterval : any;

  constructor(private _Activatedroute:ActivatedRoute,private api: ApiserviceService) { }

  ngOnInit(): void { 
    this.doGet();
    this.myInterval = setInterval(()=> { this.doGet()  }, 10 * 1000); 
  }

  ngOnDestroy() {
    clearInterval(this.myInterval);
  }

  check(dtl : any){
    if(dtl.c_dtl_data.e_action_dtl=='complete'){ 
      return;
    }
    let header = "คุณต้องการเช็ครายการนี้ใช่หรือไม่";
    let body = dtl.lng1_item_c_name;
    this.api.confirmSwal(header, body, () => { 
      let payload = {
        e_action_dtl  : 'complete',
        order_dtl_id : dtl.order_dtl_id
      }
      this.doCheck(payload); 

    }, () => {

    })
  }

  async doCheck(payload : any)  { 
    let result = await this.api.post("order.checker.save", payload).toPromise(); 
    if(result.success){
      this.api.showSwal('success', 'Save Complete', ''); 
    } 
  }

  all(){
    this.isAll = true;
    this.orderList = [];
      for (const key in this.dataList) {
        let element = this.dataList[key]; 
        for(const k in element['dtl']){
          let dtl = element['dtl'][k];
          dtl['_hdr'] = element['hdr']; 
          this.orderList.push(dtl);
        } 
      } 
  }
  
  show(row:any){
    this.isAll = false;
    this.orderList = [];
    for(const k in row['dtl']){
      let dtl = row['dtl'][k];
      dtl['_hdr'] = row['hdr'];  
      this.orderList.push(dtl);
    }
  }
   
  async doGet(){ 
    let today : any = moment().format('YYYY-MM-DD');
    let r1 : any  = await this.api.get("order.list?e_action=print_bill&date="+today+"&check=1").toPromise(); 
    if(r1['success']){
      this.dataList = [];
      this.orderList = [];
      for (const key in r1.c_data) {
        let element = r1.c_data[key];
        this.dataList.push(element);
        for(const k in element['dtl']){
          let dtl = element['dtl'][k];
          dtl['_hdr'] = element['hdr']; 
          this.orderList.push(dtl);
        } 
      } 
      console.log(this.orderList)
    }  
  }


}
