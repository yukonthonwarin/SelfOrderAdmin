import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-listbill',
  templateUrl: './listbill.component.html',
  styleUrls: ['./listbill.component.css']
})
export class ListbillComponent implements OnInit {
  dataList : any = [];
  orderList : any = []; 
  isAll : boolean = true;
  myInterval : any;

  constructor(private _Activatedroute:ActivatedRoute,private api: ApiserviceService) { }

  ngOnInit(): void { 
    this.doGet();
    
    //this.myInterval = setInterval(()=> { this.doGet()  }, 10 * 1000); 
  }

  ngOnDestroy() {
    clearInterval(this.myInterval);
  }

  check(dtl : any){
      let payload = {
        e_action_dtl  : 'complete',
        order_dtl_id : dtl.order_dtl_id
      }
      this.doCheck(payload); 

     () => {

    }
  }

  async doCheck(payload : any)  {
    let result = await this.api.post("order.checker.save", payload).toPromise(); 
    if(result.success){
      this.api.showSwal('success', 'Save Complete', '') ; 
      this.doGet(); 
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
    let r1 : any  = await this.api.get("payment.list?e_action='close_table&payment="+today+"&check=1").toPromise(); 
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
