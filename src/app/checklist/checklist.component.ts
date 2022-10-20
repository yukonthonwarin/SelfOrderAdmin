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
  sub : any;
  
  a_order_hdr : any = '0';

  constructor(private _Activatedroute:ActivatedRoute,private api: ApiserviceService) { }

  ngOnInit(): void {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params);
      this.a_order_hdr = params.get('a_order_hdr');  
    }); 
    this.doGet();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  

  async doGet(){ 
    let today : any = moment().format('YYYY-MM-DD');
    let r1 : any  = await this.api.get("order.list?e_action=print_bill&date="+today).toPromise(); 
    if(r1['success']){
      this.dataList = [];
      for (const key in r1.c_data) {
        let element = r1.c_data[key];
        element['f_doc_amt'] = 0;
        element['_check'] = false;
        if(element['hdr']['a_order_hdr']==this.a_order_hdr){
          element['_check'] = true;
        }
        for (const k2 in element['dtl']) {
          const d = element['dtl'][k2];
          element['f_doc_amt']  += (d['f_price_total']*1); 
        }
        this.dataList.push(element);
      }
    } 

  }
}
